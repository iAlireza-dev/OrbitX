import { IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class CreatePlanDto {
    @IsString()
    name : string;

    @IsOptional()
    @IsString()
    description?: string

    @IsNumber() 
    @Min(0)
    monthlyPrice: number;
};