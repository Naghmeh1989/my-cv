import { Expose, Transform } from "class-transformer";
import { Genre } from "src/genres/genre.entity";
import { ApiProperty } from '@nestjs/swagger';

export class MovieDto{
  @ApiProperty()
  @Expose()
  title:string;

  @ApiProperty()
  @Expose()
  @Transform(({obj})=>obj.genre.id)
  genre:Genre;
}