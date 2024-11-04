import { IsNumber, IsString, IsOptional} from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';


export class GetAddressDto{
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
  @Transform(({value})=>parseInt(value))
  @IsOptional()
  @IsNumber()
  houseNumber: number;

  @ApiProperty()
  @Transform(({value})=>parseInt(value))
  @IsOptional()
  @IsNumber()
  flatNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  postcode: string;
}