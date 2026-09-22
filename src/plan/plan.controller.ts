import { Controller, Post, Body } from '@nestjs/common';
import { PlanService } from './plan.service.js';
import { CreatePlanDto } from './dto/create-plan.dto.js';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  createPlan(@Body() data: CreatePlanDto) {
    return this.planService.create(data);
  }
}
