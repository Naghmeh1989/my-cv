import { IsString, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateResponseDto{
  @ApiProperty()
  @IsString()
  userName:string;

  @ApiProperty()
  @IsString()
  userSurname:string;

  @ApiProperty()
  @IsString()
  userEmail:string;

  @ApiProperty()
  @IsString()
  movieTitle:string;

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