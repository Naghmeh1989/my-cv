import { Expose, Transform } from "class-transformer";



export class UserDto{
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  surname: string;
  
  @Expose()
  mobileNumber: string;
}