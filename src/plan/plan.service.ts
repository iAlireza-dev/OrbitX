import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePlanDto } from './dto/create-plan.dto.js';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlanDto) {
    return this.prisma.plan.create({ data: dto });
  }
}
