import { IsNumber,IsString, IsOptional} from "class-validator";


export class ChangeAddressDto{
  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  streetName: string;

  @IsOptional()
  @IsNumber()
  houseNumber: number;

  @IsOptional()
  @IsNumber()
  flatNumber: number;

  @IsOptional()
  @IsString()
  postcode: string;
}