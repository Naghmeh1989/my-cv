import { IsString, IsOptional } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetMovieDto{

  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  genreTitle: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  movieTitle: string;
}