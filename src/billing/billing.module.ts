import { Module } from '@nestjs/common';
import { BillingService } from './billing.service.js';
import { BullModule } from '@nestjs/bullmq';
import { BillingScheduler } from './billing.scheduler.js';
import { BillingWorker } from './billing.worker.js';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'billing-renewal',
    }),
  ],
  providers: [BillingService, BillingScheduler,BillingWorker],
  exports: [BillingService],
})
export class BillingModule {}
