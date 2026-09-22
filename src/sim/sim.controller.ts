import { Body, Controller, Param, Post } from '@nestjs/common';
import { SimService } from './sim.service.js';
import { CreateSimDto } from './dto/create-sim.dto.js';
import { ProvisionSimDto } from './dto/provision-sim.dto.js';

@Controller('sims')
export class SimController {
  constructor(private readonly simService: SimService) {}

  @Post()
  async createSim(@Body() data: CreateSimDto) {
    return this.simService.create(data);
  }

  @Post(':id/provision')
  async provisionSim(@Param('id') id: string, @Body() data: ProvisionSimDto) {
    return this.simService.provision(id, data);
  }
}
