import { Expose, Transform } from "class-transformer";
import { Genre } from "src/genres/genre.entity";

export class MovieDto{
  @Expose()
  title:string;

  @Expose()
  @Transform(({obj})=>obj.genre.id)
  genre:Genre;
}