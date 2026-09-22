import { Controller, Post, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription.service.js';
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  createSubscription(@Body() data: CreateSubscriptionDto) {
    return this.subscriptionService.create(data);
  }
}
