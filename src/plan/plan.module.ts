import { PlanController } from './plan.controller.js';
import { PlanService } from './plan.service.js';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
