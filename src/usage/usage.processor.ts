import { AllocationService } from './../allocation/allocation.service.js';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('usage-processing')
export class UsageProcessor extends WorkerHost {
  constructor(private readonly allocationService: AllocationService) {
    super();
  }

  async process(job: Job<{ usageEventId: string }>) {
   await this.allocationService.processUsageEvent(job.data.usageEventId);
  }
}
