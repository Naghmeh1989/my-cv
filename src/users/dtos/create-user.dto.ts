import { IsString, IsEmail, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsNumber()
  mobileNumber: number;

}