import { SubscriptionService } from './../subscription/subscription.service.js';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsageProcessor } from './usage.processor.js';
import { CreateAllowanceDto } from '../allowance/dto/create-allowance.dto.js';
import { SubscriptionStatus } from '../generated/prisma/enums.js';
import { CreateUsageEventDto } from './dto/create-usage-event.dto.js';

@Injectable()
export class UsageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionService,
    @InjectQueue('usage-processing') private readonly usageQueue: Queue,
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

    const event = await this.prisma.usageEvent.create({
      data: {
        externalEventId: dto.externalEventId,
        subscriptionId: dto.subscriptionId,
        usageType: dto.usageType,
        amount: dto.amount,
        occurredAt: dto.occurredAt,
      },
    });

    await this.usageQueue.add(
      'process-usage',
      {
        usageEventId: event.id,
      },
      {
        jobId: dto.externalEventId,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );

    return event;
  }
}
