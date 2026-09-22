import { IsEnum, IsOptional, IsString } from "class-validator";
import { SimType } from "../../generated/prisma/browser.js";

export class CreateSimDto {
    @IsString()
    iccid: string;

    @IsOptional()
    @IsString()
    msisdn: string;

    @IsEnum(SimType)
    type: SimType;
}