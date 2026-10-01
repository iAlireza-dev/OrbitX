import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePlanDto } from './dto/create-plan.dto.js';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlanDto) {
    return this.prisma.plan.create({
      data: {
        name: dto.name,
        description: dto.description,
        monthlyPrice: dto.monthlyPrice,

        allowanceTemplates: {
          create: dto.allowanceTemplates.map((template) => ({
            usageType: template.usageType,
            amount: template.amount,
            priority: template.priority,
          })),
        },
      },
      include: { allowanceTemplates: true },
    });
  }

  async findById(id: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
      include: {
        allowanceTemplates: true,
      },
    });

    if (!plan) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }

    return plan;
  }
}
