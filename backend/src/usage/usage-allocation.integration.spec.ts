import 'dotenv/config';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { SubscriptionService } from '../subscription/subscription.service.js';
import { CustomerService } from '../customer/customer.service.js';
import { PlanService } from '../plan/plan.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsageService } from './usage.service.js';
import { AllocationService } from '../allocation/allocation.service.js';

import {
  AllowanceSource,
  AllowanceStatus,
  CustomerStatus,
  PlanStatus,
  SubscriptionStatus,
  UsageEventStatus,
  UsageType,
} from '../generated/prisma/enums.js';

describe('Usage allocation integration', () => {
  const prisma = new PrismaService();

  const redisService = {
    get: async () => null,
    set: async () => {},
    del: async () => {},
  };

  const customerService = new CustomerService(prisma);
  const planService = new PlanService(prisma);

  const subscriptionService = new SubscriptionService(
    prisma,
    customerService,
    planService,
    redisService as any,
  );

  const usageService = new UsageService(prisma, subscriptionService);

  const allocationService = new AllocationService(prisma, redisService as any);

  const externalEventId = `test-usage-${Date.now()}`;

  let subscriptionId: string;

  beforeAll(async () => {
    await prisma.$connect();

    const customer = await prisma.customer.create({
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: `test-${Date.now()}@orbitx.com`,
        status: CustomerStatus.ACTIVE,
      },
    });

    const plan = await prisma.plan.create({
      data: {
        name: `Test Plan ${Date.now()}`,
        monthlyPrice: 30,
        status: PlanStatus.ACTIVE,
      },
    });

    const subscription = await prisma.subscription.create({
      data: {
        customerId: customer.id,
        planId: plan.id,
        status: SubscriptionStatus.ACTIVE,
        monthlyPrice: 30,
        billingDay: 1,
        activatedAt: new Date(),
      },
    });

    subscriptionId = subscription.id;

    await prisma.allowance.createMany({
      data: [
        {
          subscriptionId,
          usageType: UsageType.DATA,
          source: AllowanceSource.PROMOTION,
          totalAmount: 1024,
          remainingAmount: 1024,
          priority: 10,
          status: AllowanceStatus.ACTIVE,
        },
        {
          subscriptionId,
          usageType: UsageType.DATA,
          source: AllowanceSource.PLAN,
          totalAmount: 1024,
          remainingAmount: 1024,
          priority: 20,
          status: AllowanceStatus.ACTIVE,
        },
        {
          subscriptionId,
          usageType: UsageType.DATA,
          source: AllowanceSource.ADDON,
          totalAmount: 2048,
          remainingAmount: 2048,
          priority: 30,
          status: AllowanceStatus.ACTIVE,
        },
      ],
    });
  });

  afterAll(async () => {
    const usageEvents = await prisma.usageEvent.findMany({
      where: { subscriptionId },
      select: { id: true },
    });

    const usageEventIds = usageEvents.map((event) => event.id);

    await prisma.allocation.deleteMany({
      where: {
        usageEventId: {
          in: usageEventIds,
        },
      },
    });

    await prisma.outboxEvent.deleteMany({
      where: {
        aggregateId: {
          in: usageEventIds,
        },
      },
    });

    await prisma.usageEvent.deleteMany({
      where: { subscriptionId },
    });

    await prisma.allowance.deleteMany({
      where: { subscriptionId },
    });

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (subscription) {
      await prisma.subscription.delete({
        where: { id: subscriptionId },
      });

      await prisma.plan.delete({
        where: { id: subscription.planId },
      });

      await prisma.customer.delete({
        where: { id: subscription.customerId },
      });
    }

    await prisma.$disconnect();
  });

  it('allocates by priority and does not process a duplicate usage event twice', async () => {
    const dto = {
      externalEventId,
      subscriptionId,
      usageType: UsageType.DATA,
      amount: 3072,
      occurredAt: new Date(),
    };

    const firstEvent = await usageService.create(dto);

    await allocationService.processUsageEvent(firstEvent.id);

    const allowancesAfterFirstRun = await prisma.allowance.findMany({
      where: { subscriptionId },
      orderBy: { priority: 'asc' },
    });

    expect(allowancesAfterFirstRun[0].remainingAmount).toBe(0);
    expect(allowancesAfterFirstRun[1].remainingAmount).toBe(0);
    expect(allowancesAfterFirstRun[2].remainingAmount).toBe(1024);

    const processedEvent = await prisma.usageEvent.findUnique({
      where: { id: firstEvent.id },
    });

    expect(processedEvent?.status).toBe(UsageEventStatus.PROCESSED);

    const allocationsAfterFirstRun = await prisma.allocation.findMany({
      where: { usageEventId: firstEvent.id },
      orderBy: { createdAt: 'asc' },
    });

    expect(allocationsAfterFirstRun).toHaveLength(3);

    const duplicateEvent = await usageService.create(dto);

    await allocationService.processUsageEvent(duplicateEvent.id);

    const allowancesAfterDuplicate = await prisma.allowance.findMany({
      where: { subscriptionId },
      orderBy: { priority: 'asc' },
    });

    expect(allowancesAfterDuplicate[0].remainingAmount).toBe(0);
    expect(allowancesAfterDuplicate[1].remainingAmount).toBe(0);
    expect(allowancesAfterDuplicate[2].remainingAmount).toBe(1024);

    const usageEventCount = await prisma.usageEvent.count({
      where: {
        externalEventId,
      },
    });

    const allocationCount = await prisma.allocation.count({
      where: {
        usageEventId: firstEvent.id,
      },
    });

    expect(usageEventCount).toBe(1);
    expect(allocationCount).toBe(3);
  });
});
