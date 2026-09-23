import { AllowanceService } from './allowance.service.js';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAllowanceDto } from './dto/create-allowance.dto.js';

@Controller('allowances')
export class AllowanceController {
  constructor(private readonly allowanceService: AllowanceService) {}

  @Post()
  createAllowance(@Body() data: CreateAllowanceDto) {
    return this.allowanceService.create(data);
  }
}
