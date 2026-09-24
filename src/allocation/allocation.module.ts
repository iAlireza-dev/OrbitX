import { Module } from '@nestjs/common';
import { AllocationService } from './allocation.service.js';
import { RedisService } from '../redis/redis.service.js';
import { RedisModule } from '../redis/redis.module.js';

@Module({
  imports: [RedisModule],
  providers: [AllocationService],
  exports: [AllocationService],
})
export class AllocationModule {}
