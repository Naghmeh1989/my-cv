import { Rental } from "src/rental/rental.entity";
import { Genre } from "src/genres/genre.entity";
import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToMany, JoinTable} from "typeorm";
import { User } from "src/users/user.entity";
import { MovieGenre } from "src/middleEntities/movie_genre.entity";

@Entity()
export class Movie{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @OneToMany(()=>Rental, (rental)=>rental.movie)
  rentals:Rental[];

  @ManyToMany(()=>Genre, (genre)=>genre.movies, {cascade:true})
  @JoinTable()
  genres:Genre[];

  @ManyToMany(()=>User, (user)=>user.subscribedMovie)
  subscribedUser:User[];

  @OneToMany(()=>MovieGenre , (movieGenre)=>movieGenre.movie)
  movieGenre: MovieGenre[];
  
}