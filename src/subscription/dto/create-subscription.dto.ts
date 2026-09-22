import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  customerId: string;

  @IsString()
  planId: string;

  @IsInt()
  @Min(1)
  @Max(31)
  billingDay: number;
}
