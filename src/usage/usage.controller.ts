import { Body, Controller, Post } from '@nestjs/common';
import { UsageService } from './usage.service.js';
import { CreateUsageEventDto } from './dto/create-usage-event.dto.js';

@Controller('usage-events')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Post()
  createUsageEvent(@Body() data: CreateUsageEventDto) {
    return this.usageService.create(data);
  }
}
