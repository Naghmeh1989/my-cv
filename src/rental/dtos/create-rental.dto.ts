import { IsString, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto{
  @ApiProperty()
  @IsString()
  dateStart:string;

  @ApiProperty()
  @IsString()
  dateReturned:string;
 
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  movieId: number;
}