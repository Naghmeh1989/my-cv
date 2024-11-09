import { Movie } from "src/movie/movie.entity";
import { User } from "src/users/user.entity";
import { Entity, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";

@Entity('user_movie')
export class UserMovie {
  @PrimaryColumn({name:'user_id'})
  userId:number;

  @PrimaryColumn({name:'movie_id'})
  movieId:number;

  @ManyToOne(()=>User, (user)=>user.subscribedMovie)
  @JoinColumn({name:'user_id' , referencedColumnName:'id'})
  user:User[];

  @ManyToOne(()=>Movie, (movie)=>movie.subscribedUser)
  @JoinColumn({name:'movie_id', referencedColumnName:'id'})
  movie:Movie[];
}