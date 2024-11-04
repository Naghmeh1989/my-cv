import { Expose ,Transform} from "class-transformer";
import { Movie } from "src/movie/movie.entity";
import { ApiProperty } from '@nestjs/swagger';

export class GenreDto{
  @ApiProperty()
  @Expose()
  title:string;

  @ApiProperty()
  @Expose()
  isActive:boolean;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.movie.id)
  movie: Movie;
}