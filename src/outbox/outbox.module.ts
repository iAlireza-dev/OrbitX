import { Module } from '@nestjs/common';
import { OutboxDispatcher } from './outbox.dispatcher.js';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'usage-processing',
    }),
  ],
  providers: [OutboxDispatcher],
})
export class OutboxModule {}
