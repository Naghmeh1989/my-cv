import { Column, Entity, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import { Movie } from "src/movie/movie.entity";
import { User } from "src/users/user.entity";


@Entity()
export class Genre{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @ManyToMany(()=>Movie, (movie)=>movie.genres)
  movies:Movie[];

  @ManyToMany(()=>User, (user)=>user.subscribedGenre)
  subscribedUser:User[];

  @Column({nullable:true})
  isActive:boolean;
}