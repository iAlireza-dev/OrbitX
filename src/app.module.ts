import { SubscriptionModule } from './subscription/subscription.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CustomerModule } from './customer/customer.module.js';
import { PlanModule } from './plan/plan.module.js';
import { SimModule } from './sim/sim.module.js';
import { AllowanceModule } from './allowance/allowance.module.js';
import { UsageModule } from './usage/usage.module.js';
import { BullModule } from '@nestjs/bullmq';
import { AllocationModule } from './allocation/allocation.module.js';

@Module({
  imports: [
    SubscriptionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CustomerModule,
    PlanModule,
    SimModule,
    AllowanceModule,
    UsageModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>('REDIS_HOST'),
          port: Number(configService.getOrThrow<string>('REDIS_PORT')),
          username: configService.get<string>('REDIS_USERNAME') || undefined,
          password: configService.get<string>('REDIS_PASSWORD') || undefined,
          tls:
            configService.get<string>('REDIS_TLS') === 'true' ? {} : undefined,
        },
      }),
    }),
    AllocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
