import { IsString } from 'class-validator';

export class ProvisionSimDto {
  @IsString()
  subscriptionId: string;
}
