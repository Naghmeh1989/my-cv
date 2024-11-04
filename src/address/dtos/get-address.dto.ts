import { IsNumber, IsString, IsOptional} from "class-validator";
import { Transform } from "class-transformer";


export class GetAddressDto{
  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  streetName: string;

  @Transform(({value})=>parseInt(value))
  @IsOptional()
  @IsNumber()
  houseNumber: number;

  @Transform(({value})=>parseInt(value))
  @IsOptional()
  @IsNumber()
  flatNumber: number;

  @IsOptional()
  @IsString()
  postcode: string;
}