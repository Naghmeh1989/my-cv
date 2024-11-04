import { IsArray, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieGenreDto{
  @ApiProperty()
  @IsString()
  title:string;

  @ApiProperty()
  @IsArray()
  genres:string[];
}