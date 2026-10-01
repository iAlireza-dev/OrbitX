import { Module } from '@nestjs/common';
import { UsageService } from './usage.service.js';
import { UsageController } from './usage.controller.js';
import { BullModule } from '@nestjs/bullmq';
import { SubscriptionModule } from '../subscription/subscription.module.js';
import { UsageProcessor } from './usage.processor.js';
import { AllocationModule } from '../allocation/allocation.module.js';

@Module({
  imports: [
    SubscriptionModule,
    BullModule.registerQueue({
      name: 'usage-processing',
    }),
    AllocationModule,
  ],
  providers: [UsageService, UsageProcessor],
  controllers: [UsageController],
})
export class UsageModule {}
