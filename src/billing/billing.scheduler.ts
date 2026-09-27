import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Interval } from '@nestjs/schedule';
import { Queue } from 'bullmq';

import { PrismaService } from '../prisma/prisma.service.js';
import { SubscriptionStatus } from '../generated/prisma/enums.js';

@Injectable()
export class BillingScheduler {
  constructor(
    private readonly prisma: PrismaService,

    @InjectQueue('billing-renewal')
    private readonly billingQueue: Queue,
  ) {}

  @Interval('billing-scheduler', 60_000)
  async scheduleDueSubscriptions() {
    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        status: SubscriptionStatus.ACTIVE,
        nextBillingAt: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
        nextBillingAt: true,
      },
    });

    for (const subscription of subscriptions) {
      if (!subscription.nextBillingAt) continue;

      await this.billingQueue.add(
        'renew-subscription',
        {
          subscriptionId: subscription.id,
          billingAt: subscription.nextBillingAt,
        },
        {
          jobId: `${subscription.id}-${subscription.nextBillingAt.getTime()}`,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        },
      );
    }
  }
}
