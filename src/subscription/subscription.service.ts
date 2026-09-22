import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CustomerService } from '../customer/customer.service.js';
import { PlanService } from '../plan/plan.service.js';
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomerService,
    private readonly planService: PlanService,
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
}
