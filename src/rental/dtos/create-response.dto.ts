import { IsString, IsNumber } from "class-validator";
export class CreateResponseDto{
  @IsString()
  userName:string;

  @IsString()
  userSurname:string;

  @IsString()
  userEmail:string;

  @IsString()
  movieTitle:string;

  @IsString()
  dateStart:string;

  @IsString()
  dateReturned:string;

  @IsNumber()
  userId: number;

  @IsNumber()
  movieId: number;
}