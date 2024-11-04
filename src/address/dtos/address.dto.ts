import { Expose, Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto{
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  country: string;

  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty()
  @Expose()
  streetName: string;

  @ApiProperty()
  @Expose()
  houseNumber: number;

  @ApiProperty()
  @Expose()
  flatNumber: number;

  @ApiProperty()
  @Expose()
  postcode: string;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.id)
  userId: number;
}