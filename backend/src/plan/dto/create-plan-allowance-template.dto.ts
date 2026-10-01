import { IsEnum, IsInt, Min } from 'class-validator';
import { UsageType } from '../../generated/prisma/enums.js';

export class CreatePlanAllowanceTemplateDto {
  @IsEnum(UsageType)
  usageType: UsageType;

  @IsInt()
  @Min(1)
  amount: number;

  @IsInt()
  @Min(1)
  priority: number;
}
