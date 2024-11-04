import { IsString, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateMovieDto{
  @ApiProperty()
  @IsString()
  title:string;

  @ApiProperty()
  @IsNumber()
  genreId:number;
}