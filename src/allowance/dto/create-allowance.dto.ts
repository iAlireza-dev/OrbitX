import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { AllowanceSource, UsageType } from '../../generated/prisma/enums.js';
import { Type } from 'class-transformer';

export class CreateAllowanceDto {
  @IsString()
  subscriptionId: string;

  @IsEnum(UsageType)
  usageType: UsageType;

  @IsEnum(AllowanceSource)
  source: AllowanceSource;

  @IsInt()
  @Min(1)
  totalAmount: number;

  @IsInt()
  @Min(1)
  priority: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startsAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiresAt?: Date;
}
