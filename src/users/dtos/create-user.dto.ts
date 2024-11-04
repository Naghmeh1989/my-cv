import { IsString, IsEmail, IsNumber } from "class-validator";

export class CreateUserDto{
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsNumber()
  mobileNumber: number;
}