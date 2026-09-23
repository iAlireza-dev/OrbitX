import { Module } from '@nestjs/common';
import { AllocationService } from './allocation.service.js';

@Module({
  providers: [AllocationService],
  exports: [AllocationService]
})
export class AllocationModule {}
