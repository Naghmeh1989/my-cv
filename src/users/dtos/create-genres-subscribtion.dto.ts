import { IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';



export class CreateGenresSubscribtionDto{
  @ApiProperty()
  @IsNumber()
  userId:number;
  
  @ApiProperty()
  @IsNumber()
  genreId:number;
}