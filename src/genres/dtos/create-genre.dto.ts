import { IsString, IsNumber, IsBoolean } from "class-validator";
export class CreateGenreDto{
  @IsString()
  title:string;

  @IsNumber()
  movieId:number;

  @IsBoolean()
  isActive:boolean;
}