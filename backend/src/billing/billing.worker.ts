import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { BillingService } from './billing.service.js';

type BillingJobData = {
  subscriptionId: string;
  billingAt: string | Date;
};

@Processor('billing-renewal')
export class BillingWorker extends WorkerHost {
  constructor(private readonly billingService: BillingService) {
    super();
  }

  async process(job: Job<BillingJobData>) {
    await this.billingService.renewSubscription(
      job.data.subscriptionId,
      new Date(job.data.billingAt),
    );
  }
}
