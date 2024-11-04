import { IsArray, IsString } from "class-validator";

export class CreateMovieGenreDto{
  @IsString()
  title:string;

  @IsArray()
  genres:string[];
}