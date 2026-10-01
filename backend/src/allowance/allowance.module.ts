import { Module } from '@nestjs/common';
import { AllowanceService } from './allowance.service.js';
import { AllowanceController } from './allowance.controller.js';
import { SubscriptionModule } from '../subscription/subscription.module.js';

@Module({
  imports: [SubscriptionModule],
  providers: [AllowanceService],
  controllers: [AllowanceController]
})
export class AllowanceModule {}
