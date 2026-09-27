import { IsEmail, IsString, Min } from 'class-validator';
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
