import { Genre } from "src/genres/genre.entity";
import { User } from "src/users/user.entity";
import { Entity, JoinColumn, PrimaryColumn, ManyToOne } from "typeorm";

@Entity('user_genre')
export class UserGenre {
  @PrimaryColumn({name:'user_id'})
  userId:number;

  @PrimaryColumn({name:'genre_id'})
  genreId:number;

  @ManyToOne(()=>User, (user)=>user.subscribedGenre)
  @JoinColumn({name:'user_id', referencedColumnName:'id'})
  user:User;

  @ManyToOne(()=>Genre, (genre)=>genre.subscribedUser)
  @JoinColumn({ name:'genre_id', referencedColumnName:'id'})
  genre:Genre;
}