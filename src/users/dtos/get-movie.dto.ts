import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class GetMovieDto{

  @ApiProperty()
  @IsString()
  @IsOptional()
  genreTitle: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  movieTitle: string;
}