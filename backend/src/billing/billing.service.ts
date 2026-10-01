import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import {
  AllowanceSource,
  BillingCycleStatus,
  SubscriptionStatus,
  AllowanceStatus,
} from '../generated/prisma/enums.js';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async createCycleAllowances(
    tx: Prisma.TransactionClient,
    subscriptionId: string,
    billingCycleId: string,
    startsAt: Date,
    endsAt: Date,
  ) {
    const subscription = await tx.subscription.findUnique({
      where: {
        id: subscriptionId,
      },
      include: {
        plan: {
          include: {
            allowanceTemplates: true,
          },
        },
      },
    });

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with ID ${subscriptionId} not found`,
      );
    }

    await tx.allowance.createMany({
      data: subscription.plan.allowanceTemplates.map((template) => ({
        subscriptionId,
        billingCycleId,

        usageType: template.usageType,
        source: AllowanceSource.PLAN,

        totalAmount: template.amount,
        remainingAmount: template.amount,

        priority: template.priority,

        startsAt,
        expiresAt: endsAt,
      })),
    });
  }

  async renewSubscription(subscriptionId: string, billingAt: Date) {
    const nextBillingAt = new Date(billingAt);
    nextBillingAt.setMonth(nextBillingAt.getMonth() + 1);

    return this.prisma.$transaction(async (tx) => {
      const subscription = await tx.subscription.findUnique({
        where: {
          id: subscriptionId,
        },
      });

      if (!subscription) {
        throw new NotFoundException(
          `Subscription with ID ${subscriptionId} not found`,
        );
      }

      const claimed = await tx.subscription.updateMany({
        where: {
          id: subscriptionId,
          status: SubscriptionStatus.ACTIVE,
          nextBillingAt: billingAt,
        },
        data: {
          nextBillingAt,
        },
      });

      if (claimed.count !== 1) {
        return;
      }

      const currentCycle = await tx.billingCycle.findFirst({
        where: {
          subscriptionId,
          status: BillingCycleStatus.ACTIVE,
        },
      });

      if (!currentCycle) {
        throw new NotFoundException(
          `Active billing cycle for subscription ${subscriptionId} not found`,
        );
      }

      await tx.allowance.updateMany({
        where: {
          billingCycleId: currentCycle.id,
          status: AllowanceStatus.ACTIVE,
        },
        data: {
          status: AllowanceStatus.EXPIRED,
        },
      });

      await tx.billingCycle.update({
        where: {
          id: currentCycle.id,
        },
        data: {
          status: BillingCycleStatus.CLOSED,
        },
      });

      const billingCycle = await tx.billingCycle.create({
        data: {
          subscriptionId,
          startsAt: billingAt,
          endsAt: nextBillingAt,
        },
      });

      await this.createCycleAllowances(
        tx,
        subscriptionId,
        billingCycle.id,
        billingAt,
        nextBillingAt,
      );

      return billingCycle;
    });
  }
}
