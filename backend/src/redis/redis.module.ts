import { RedisService } from './redis.service.js';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
