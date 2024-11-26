import { Expose, Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';



export class UserDto{
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  surname: string;
  
  @ApiProperty()
  @Expose()
  mobileNumber: string;

  @ApiProperty()
  @Expose()
  profileImage: string;


}