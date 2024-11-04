import { Expose, Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';


export class ResponseDto{
  @ApiProperty()
  @Expose()
  dateStart:string;

  @ApiProperty()
  @Expose()
  dateReturned:string;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.user.id)
  userName:string;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.user.id)
  userSurname:string;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.user.id)
  userEmail:string;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.movie.id)
  movieTitle:string;
}