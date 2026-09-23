import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsString, Min } from 'class-validator';

import { UsageType } from '../../generated/prisma/enums.js';

export class CreateUsageEventDto {
  @IsString()
  externalEventId: string;

  @IsString()
  subscriptionId: string;

  @IsEnum(UsageType)
  usageType: UsageType;

  @IsInt()
  @Min(1)
  amount: number;

  @Type(() => Date)
  @IsDate()
  occurredAt: Date;
}
