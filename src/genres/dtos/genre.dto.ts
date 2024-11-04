import { Expose ,Transform} from "class-transformer";
import { Movie } from "src/movie/movie.entity";

export class GenreDto{
  @Expose()
  title:string;

  @Expose()
  isActive:boolean;

  @Expose()
  @Transform(({obj})=>obj.movie.id)
  movie: Movie;
}