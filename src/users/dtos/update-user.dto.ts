import { IsString, IsEmail, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto{
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  surname: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  mobileNumber: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  profileImage: string;
}