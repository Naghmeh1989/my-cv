import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";
import { Movie } from "src/movie/movie.entity";

export class RentalDto{
  @Expose()
  dateStart:string;

  @Expose()
  dateReturned:string;

  @Expose()
  @Transform(({obj})=>obj.user.id)
  user:User;

  @Expose()
  @Transform(({obj})=>obj.movie.id)
  movies:Movie[];


}