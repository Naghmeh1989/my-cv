import { IsNumber } from "class-validator";



export class CreateGenresSubscribtionDto{
  @IsNumber()
  userId:number;
  
  
  @IsNumber()
  genreId:number;
}