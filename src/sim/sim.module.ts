import { Module } from '@nestjs/common';
import { SimController } from './sim.controller.js';
import { SimService } from './sim.service.js';
import { SubscriptionModule } from '../subscription/subscription.module.js';
import { BillingModule } from '../billing/billing.module.js';

@Module({
  imports: [SubscriptionModule,BillingModule],
  controllers: [SimController],
  providers: [SimService],
})
export class SimModule {}
