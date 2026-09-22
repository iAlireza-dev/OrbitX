import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSimDto } from './dto/create-sim.dto.js';
import { ProvisionSimDto } from './dto/provision-sim.dto.js';
import { SimStatus, SubscriptionStatus } from '../generated/prisma/enums.js';

@Injectable()
export class SimService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSimDto) {
    return this.prisma.sim.create({
      data: dto,
    });
  }

  async findById(id: string) {
    const sim = await this.prisma.sim.findUnique({
      where: { id },
    });

    if (!sim) {
      throw new NotFoundException(`Sim with ID ${id} not found`);
    }

    return sim;
  }

  async provision(simId: string, data: ProvisionSimDto) {
    return this.prisma.$transaction(async (tx) => {
      const sim = await tx.sim.findUnique({
        where: { id: simId },
      });

      if (!sim) {
        throw new NotFoundException(`Sim with ID ${simId} not found`);
      }

      if (sim.status !== SimStatus.AVAILABLE) {
        throw new BadRequestException(`Sim with ID ${simId} is not available`);
      }

      const subscription = await tx.subscription.findUnique({
        where: { id: data.subscriptionId },
      });

      if (!subscription) {
        throw new NotFoundException(
          `Subscription with ID ${data.subscriptionId} not found`,
        );
      }

      if (subscription.status !== SubscriptionStatus.PENDING) {
        throw new BadRequestException(
          `Subscription with ID ${data.subscriptionId} is not pending`,
        );
      }

      const activatedAt = new Date();

      const simUpdate = await tx.sim.updateMany({
        where: {
          id: simId,
          status: SimStatus.AVAILABLE,
        },
        data: {
          status: SimStatus.ACTIVE,
          subscriptionId: data.subscriptionId,
          activatedAt,
        },
      });

      if (simUpdate.count !== 1) {
        throw new ConflictException('Sim was provisioned by another request');
      }

      const subscriptionUpdate = await tx.subscription.updateMany({
        where: {
          id: data.subscriptionId,
          status: SubscriptionStatus.PENDING,
        },
        data: {
          status: SubscriptionStatus.ACTIVE,
          activatedAt,
        },
      });

      if (subscriptionUpdate.count !== 1) {
        throw new ConflictException(
          'Subscription state changed during provisioning',
        );
      }

      return tx.sim.findUnique({
        where: { id: simId },
        include: {
          subscription: true,
        },
      });
    });
  }
}
