import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { SubscriptionService } from '../subscription/subscription.service.js';
import { CreateAllowanceDto } from './dto/create-allowance.dto.js';
import { SubscriptionStatus } from '../generated/prisma/enums.js';

@Injectable()
export class AllowanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async create(dto: CreateAllowanceDto) {
    const subscription = await this.subscriptionService.findById(
      dto.subscriptionId,
    );
    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new BadRequestException(
        `Subscription with ID ${dto.subscriptionId} not active`,
      );
    }
    const startsAt = dto.startsAt ?? new Date();

    if (dto.expiresAt && dto.expiresAt <= startsAt) {
      throw new BadRequestException(
        'Allowance expiration date must be after its start date',
      );
    }

    return this.prisma.allowance.create({
      data: {
        subscriptionId: dto.subscriptionId,
        usageType: dto.usageType,
        source: dto.source,
        totalAmount: dto.totalAmount,
        remainingAmount: dto.totalAmount,
        priority: dto.priority,
        startsAt,
        expiresAt: dto.expiresAt,
      },
    });
  }
}
