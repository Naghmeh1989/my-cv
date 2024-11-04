import { IsString, IsNumber } from "class-validator";

export class CreateRentalDto{
  @IsString()
  dateStart:string;

  @IsString()
  dateReturned:string;
 
  @IsNumber()
  userId: number;

  @IsNumber()
  movieId: number;
}