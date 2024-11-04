import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";
import { Movie } from "src/movie/movie.entity";
import { ApiProperty } from '@nestjs/swagger';

export class RentalDto{
  @ApiProperty()
  @Expose()
  dateStart:string;

  @ApiProperty()
  @Expose()
  dateReturned:string;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.user.id)
  user:User;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.movie.id)
  movies:Movie[];


}