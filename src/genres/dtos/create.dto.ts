import { IsString, IsBoolean } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateDto{
  @ApiProperty()
  @IsString()
  title:string;

  @ApiProperty()
  @IsBoolean()
  isActive:boolean;
}