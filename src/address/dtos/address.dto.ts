import { Expose, Transform } from "class-transformer";

export class AddressDto{
  @Expose()
  id: number;

  @Expose()
  country: string;

  @Expose()
  city: string;

  @Expose()
  streetName: string;

  @Expose()
  houseNumber: number;

  @Expose()
  flatNumber: number;

  @Expose()
  postcode: string;

  @Expose()
  @Transform(({obj})=>obj.id)
  userId: number;
}