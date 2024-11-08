import { IsNumber, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateAddressDto{
  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  streetName: string;

  @ApiProperty()
  @IsNumber()
  houseNumber: number;

  @ApiProperty()
  @IsNumber()
  flatNumber: number;

  @ApiProperty()
  @IsString()
  postcode: string;

  @ApiProperty()
  @IsNumber()
  userId:number;
}