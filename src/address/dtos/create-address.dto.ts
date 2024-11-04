import { IsNumber, IsString} from "class-validator";


export class CreateAddressDto{
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  streetName: string;

  @IsNumber()
  houseNumber: number;

  @IsNumber()
  flatNumber: number;

  @IsString()
  postcode: string;
}