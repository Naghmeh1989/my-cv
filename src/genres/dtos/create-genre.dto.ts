import { IsString, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateGenreDto{
  @ApiProperty()
  @IsString()
  title:string;

  @ApiProperty()
  @IsNumber()
  movieId:number;

  @ApiProperty()
  @IsBoolean()
  isActive:boolean;
}