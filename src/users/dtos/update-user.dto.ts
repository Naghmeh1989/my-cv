import { IsString, IsEmail, IsOptional, IsNumber } from "class-validator";
export class UpdateUserDto{
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsNumber()
  @IsOptional()
  mobileNumber: number;
}