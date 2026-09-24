import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Interval } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service.js';
import { OutboxEventType, OutboxStatus } from '../generated/prisma/enums.js';

type ClaimedOutboxEvent = {
  id: string;
  type: OutboxEventType;
  aggregateId: string;
  attempts: number;
};

@Injectable()
export class OutboxDispatcher {
  private readonly logger = new Logger(OutboxDispatcher.name);

  private readonly instanceId = randomUUID();

  private readonly batchSize = 20;
  private readonly maxAttempts = 5;
  private readonly staleLockMs = 30_000;

  private isDispatching = false;

  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('usage-processing')
    private readonly usageQueue: Queue,
  ) {}

  @Interval('outbox-dispatch', 1000)
  async dispatch() {
    if (this.isDispatching) {
      return;
    }

    this.isDispatching = true;

    try {
      await this.recoverStaleEvents();

      const events = await this.claimPendingEvents();

      for (const event of events) {
        await this.publishEvent(event);
      }
    } catch (error) {
      this.logger.error(
        `Outbox dispatch cycle failed: ${this.getErrorMessage(error)}`,
      );
    } finally {
      this.isDispatching = false;
    }
  }

  private async claimPendingEvents(): Promise<ClaimedOutboxEvent[]> {
    return this.prisma.$queryRaw<ClaimedOutboxEvent[]>`
      WITH candidates AS (
        SELECT id
        FROM "OutboxEvent"
        WHERE status = 'PENDING'
          AND "availableAt" <= NOW()
        ORDER BY "createdAt" ASC
        FOR UPDATE SKIP LOCKED
        LIMIT ${this.batchSize}
      )

      UPDATE "OutboxEvent" AS outbox
      SET
        status = 'PROCESSING',
        "lockedAt" = NOW(),
        "lockedBy" = ${this.instanceId},
        attempts = outbox.attempts + 1,
        "updatedAt" = NOW()
      FROM candidates
      WHERE outbox.id = candidates.id
      RETURNING
        outbox.id,
        outbox.type,
        outbox."aggregateId",
        outbox.attempts
    `;
  }

  private async publishEvent(event: ClaimedOutboxEvent) {
    try {
      switch (event.type) {
        case OutboxEventType.USAGE_EVENT_RECEIVED:
          await this.usageQueue.add(
            'process-usage',
            {
              usageEventId: event.aggregateId,
            },
            {
              jobId: event.id,
              attempts: 3,
              backoff: {
                type: 'exponential',
                delay: 1000,
              },
            },
          );
          break;

        default:
          throw new Error(`Unsupported outbox event type: ${event.type}`);
      }

      const result = await this.prisma.outboxEvent.updateMany({
        where: {
          id: event.id,
          status: OutboxStatus.PROCESSING,
          lockedBy: this.instanceId,
        },
        data: {
          status: OutboxStatus.PUBLISHED,
          publishedAt: new Date(),
          lockedAt: null,
          lockedBy: null,
          lastError: null,
        },
      });

      if (result.count !== 1) {
        throw new Error(`Could not mark outbox event ${event.id} as published`);
      }
    } catch (error) {
      const message = this.getErrorMessage(error);

      this.logger.error(
        `Failed to publish outbox event ${event.id}: ${message}`,
      );

      try {
        await this.handlePublishFailure(event, message);
      } catch (stateError) {
        this.logger.error(
          `Could not update failed outbox event ${event.id}: ${this.getErrorMessage(
            stateError,
          )}`,
        );
      }
    }
  }

  private async handlePublishFailure(
    event: ClaimedOutboxEvent,
    errorMessage: string,
  ) {
    if (event.attempts >= this.maxAttempts) {
      await this.prisma.outboxEvent.updateMany({
        where: {
          id: event.id,
          status: OutboxStatus.PROCESSING,
          lockedBy: this.instanceId,
        },
        data: {
          status: OutboxStatus.FAILED,
          lockedAt: null,
          lockedBy: null,
          lastError: errorMessage,
        },
      });

      return;
    }

    const delayMs = Math.min(
      60_000,
      1000 * 2 ** Math.max(0, event.attempts - 1),
    );

    await this.prisma.outboxEvent.updateMany({
      where: {
        id: event.id,
        status: OutboxStatus.PROCESSING,
        lockedBy: this.instanceId,
      },
      data: {
        status: OutboxStatus.PENDING,
        availableAt: new Date(Date.now() + delayMs),
        lockedAt: null,
        lockedBy: null,
        lastError: errorMessage,
      },
    });
  }

  private async recoverStaleEvents() {
    const staleBefore = new Date(Date.now() - this.staleLockMs);

    await this.prisma.outboxEvent.updateMany({
      where: {
        status: OutboxStatus.PROCESSING,
        lockedAt: {
          lt: staleBefore,
        },
        attempts: {
          lt: this.maxAttempts,
        },
      },
      data: {
        status: OutboxStatus.PENDING,
        availableAt: new Date(),
        lockedAt: null,
        lockedBy: null,
        lastError: 'Recovered stale processing lock',
      },
    });

    await this.prisma.outboxEvent.updateMany({
      where: {
        status: OutboxStatus.PROCESSING,
        lockedAt: {
          lt: staleBefore,
        },
        attempts: {
          gte: this.maxAttempts,
        },
      },
      data: {
        status: OutboxStatus.FAILED,
        lockedAt: null,
        lockedBy: null,
        lastError: 'Maximum outbox delivery attempts exceeded',
      },
    });
  }

  private getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Unknown error';
  }
}
