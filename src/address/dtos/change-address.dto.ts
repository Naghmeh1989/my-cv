import { IsNumber,IsString, IsOptional} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class ChangeAddressDto{
  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  streetName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  houseNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  flatNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  postcode: string;
}