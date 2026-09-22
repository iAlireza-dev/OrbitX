import { SubscriptionModule } from './subscription/subscription.module.js';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CustomerModule } from './customer/customer.module.js';
import { PlanModule } from './plan/plan.module.js';

@Module({
  imports: [
    SubscriptionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CustomerModule,
    PlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
