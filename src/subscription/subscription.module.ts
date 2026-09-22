import { CustomerModule } from '../customer/customer.module.js';
import { PlanModule } from '../plan/plan.module.js';
import { SubscriptionController } from './subscription.controller.js';
import { SubscriptionService } from './subscription.service.js';
import { Module } from '@nestjs/common';

@Module({
  imports: [CustomerModule, PlanModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
