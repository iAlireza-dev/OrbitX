import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { PrismaService } from '../prisma/prisma.service.js';

@Processor('usage-processing')
export class UsageProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<{ usageEventId: string }>) {
    const usageEvent = await this.prisma.usageEvent.findUnique({
      where: {
        id: job.data.usageEventId,
      },
    });

    if (!usageEvent) {
      throw new Error(`Usage event with ID ${job.data.usageEventId} not found`);
    }

    await this.prisma.usageEvent.update({
      where: {
        id: usageEvent.id,
      },
      data: {
        status: 'PROCESSING',
      },
    });

    console.log('Processing real usage event:', usageEvent);
  }
}
