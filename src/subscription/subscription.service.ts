import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CustomerService } from '../customer/customer.service.js';
import { PlanService } from '../plan/plan.service.js';
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';
import { AllowanceStatus, UsageType } from '../generated/prisma/enums.js';
import { RedisService } from '../redis/redis.service.js';
@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomerService,
    private readonly planService: PlanService,
    private readonly redisService: RedisService,
  ) {}

  async create(dto: CreateSubscriptionDto) {
    const customer = await this.customerService.findById(dto.customerId);
    const plan = await this.planService.findById(dto.planId);

    if (customer.status !== 'ACTIVE') {
      throw new BadRequestException(
        `Customer with ID ${dto.customerId} is not active`,
      );
    }

    if (plan.status !== 'ACTIVE') {
      throw new BadRequestException(`Plan with ID ${dto.planId} is not active`);
    }

    return this.prisma.subscription.create({
      data: {
        customerId: dto.customerId,
        planId: dto.planId,
        billingDay: dto.billingDay,
        monthlyPrice: plan.monthlyPrice,
      },
    });
  }

  async findById(id: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscription;
  }

  async getUsageSummary(id: string) {
    const cacheKey = `subscription:${id}:usage-summary`;

    const cachedSummary =
      await this.redisService.get<Record<string, unknown>>(cacheKey);

    if (cachedSummary) {
      return cachedSummary;
    }

    await this.findById(id);

    const now = new Date();

    const allowances = await this.prisma.allowance.findMany({
      where: {
        subscriptionId: id,
        status: {
          in: [AllowanceStatus.ACTIVE, AllowanceStatus.EXHAUSTED],
        },
        startsAt: {
          lte: now,
        },
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
    });

    const summary = {
      [UsageType.DATA]: {
        total: 0,
        remaining: 0,
      },
      [UsageType.VOICE]: {
        total: 0,
        remaining: 0,
      },
      [UsageType.SMS]: {
        total: 0,
        remaining: 0,
      },
    };

    for (const allowance of allowances) {
      const usage = summary[allowance.usageType];

      usage.total += allowance.totalAmount;
      usage.remaining += allowance.remainingAmount;
    }

    const usageSummary = {
      subscriptionId: id,

      data: {
        total: summary.DATA.total,
        used: summary.DATA.total - summary.DATA.remaining,
        remaining: summary.DATA.remaining,
        unit: 'MB',
      },

      voice: {
        total: summary.VOICE.total,
        used: summary.VOICE.total - summary.VOICE.remaining,
        remaining: summary.VOICE.remaining,
        unit: 'SECONDS',
      },

      sms: {
        total: summary.SMS.total,
        used: summary.SMS.total - summary.SMS.remaining,
        remaining: summary.SMS.remaining,
        unit: 'COUNT',
      },
    };

    await this.redisService.set(cacheKey, usageSummary, 60);

    return usageSummary;
  }
}
