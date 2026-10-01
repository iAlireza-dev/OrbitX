import { SubscriptionService } from './../subscription/subscription.service.js';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import {
  OutboxEventType,
  SubscriptionStatus,
} from '../generated/prisma/enums.js';
import { CreateUsageEventDto } from './dto/create-usage-event.dto.js';

@Injectable()
export class UsageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async create(dto: CreateUsageEventDto) {
    const subscription = await this.subscriptionService.findById(
      dto.subscriptionId,
    );
    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new BadRequestException(
        `Subscription with ID ${dto.subscriptionId} is not active`,
      );
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const usageEvent = await tx.usageEvent.create({
          data: {
            externalEventId: dto.externalEventId,
            subscriptionId: dto.subscriptionId,
            usageType: dto.usageType,
            amount: dto.amount,
            occurredAt: dto.occurredAt,
          },
        });

        await tx.outboxEvent.create({
          data: {
            type: OutboxEventType.USAGE_EVENT_RECEIVED,
            aggregateId: usageEvent.id,
            payload: {
              usageEventId: usageEvent.id,
            },
          },
        });

        return usageEvent;
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const existingEvent = await this.prisma.usageEvent.findUnique({
          where: {
            externalEventId: dto.externalEventId,
          },
        });

        if (existingEvent) {
          return existingEvent;
        }
      }

      throw error;
    }
  }
}
