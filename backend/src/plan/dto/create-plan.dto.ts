import { IsNumber, IsString, Min, IsOptional, IsArray, ArrayMinSize, ValidateNested, ArrayMaxSize } from 'class-validator';
import { CreatePlanAllowanceTemplateDto } from './create-plan-allowance-template.dto.js';
import { Type } from 'class-transformer';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  monthlyPrice: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => CreatePlanAllowanceTemplateDto)
  allowanceTemplates: CreatePlanAllowanceTemplateDto[];
};