import { Genre } from "src/genres/genre.entity";
import { Movie } from "src/movie/movie.entity";
import { Entity, JoinColumn, PrimaryColumn, ManyToOne } from "typeorm";

@Entity('movie_genre')
export class MovieGenre { 
  @PrimaryColumn({name:'movie_id'})
  movieId:number;

  @PrimaryColumn({name:'genre_id'})
  genreId:number;

  @ManyToOne(()=>Genre, (genre)=>genre.movies)
  @JoinColumn({name:'genre_id', referencedColumnName:'id'})
  genre:Genre[];

  @ManyToOne(()=>Movie, (movie)=>movie.genres)
  @JoinColumn({name:'movie_id', referencedColumnName:'id'})
  movie:Movie[];
}