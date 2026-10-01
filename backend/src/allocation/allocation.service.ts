import {
  AllowanceStatus,
  UsageEventStatus,
} from './../generated/prisma/enums.js';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { RedisService } from '../redis/redis.service.js';

@Injectable()
export class AllocationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async processUsageEvent(usageEventId: string) {
    const result = await this.prisma.$transaction(async (tx) => {
      const usageEvent = await tx.usageEvent.findUnique({
        where: {
          id: usageEventId,
        },
      });

      if (!usageEvent) {
        throw new NotFoundException(
          `Usage event with ID ${usageEventId} not found`,
        );
      }

      if (
        usageEvent.status === UsageEventStatus.PROCESSED ||
        usageEvent.status === UsageEventStatus.REJECTED
      ) {
        return;
      }

      const allowances = await tx.allowance.findMany({
        where: {
          subscriptionId: usageEvent.subscriptionId,
          usageType: usageEvent.usageType,
          status: AllowanceStatus.ACTIVE,

          remainingAmount: {
            gt: 0,
          },

          startsAt: {
            lte: usageEvent.occurredAt,
          },

          OR: [
            {
              expiresAt: null,
            },
            {
              expiresAt: {
                gt: usageEvent.occurredAt,
              },
            },
          ],
        },

        orderBy: [
          {
            priority: 'asc',
          },
          {
            createdAt: 'asc',
          },
        ],
      });

      const totalAvailable = allowances.reduce(
        (total, allowance) => total + allowance.remainingAmount,
        0,
      );

      if (totalAvailable < usageEvent.amount) {
        return tx.usageEvent.update({
          where: {
            id: usageEvent.id,
          },
          data: {
            status: UsageEventStatus.REJECTED,
            processedAt: new Date(),
            failureReason: 'Insufficient allowance',
          },
        });
      }

      let remainingUsage = usageEvent.amount;

      for (const allowance of allowances) {
        if (remainingUsage <= 0) {
          break;
        }

        const allocatedAmount = Math.min(
          remainingUsage,
          allowance.remainingAmount,
        );

        const result = await tx.allowance.updateMany({
          where: {
            id: allowance.id,
            status: AllowanceStatus.ACTIVE,

            remainingAmount: {
              gte: allocatedAmount,
            },
          },

          data: {
            remainingAmount: {
              decrement: allocatedAmount,
            },
          },
        });

        if (result.count !== 1) {
          throw new ConflictException(
            `Allowance ${allowance.id} balance changed during allocation`,
          );
        }

        await tx.allocation.create({
          data: {
            usageEventId: usageEvent.id,
            allowanceId: allowance.id,
            amount: allocatedAmount,
          },
        });

        await tx.allowance.updateMany({
          where: {
            id: allowance.id,
            remainingAmount: 0,
            status: AllowanceStatus.ACTIVE,
          },
          data: {
            status: AllowanceStatus.EXHAUSTED,
          },
        });

        remainingUsage -= allocatedAmount;
      }

      if (remainingUsage !== 0) {
        throw new ConflictException(
          'Usage allocation could not be completed because allowance balances changed',
        );
      }

      return tx.usageEvent.update({
        where: {
          id: usageEvent.id,
        },
        data: {
          status: UsageEventStatus.PROCESSED,
          processedAt: new Date(),
          failureReason: null,
        },
      });
    });
    if (result) {
      const cacheKey = `subscription:${result.subscriptionId}: usage-summary`;
      try {
        await this.redisService.del(cacheKey);
      } catch {}
    }
    return result;
  }
}
