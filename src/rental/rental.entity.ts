import { User } from "src/users/user.entity";
import { Movie } from "src/movie/movie.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity()
export class Rental{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({nullable:true})
  dateStart:string;

  @Column({nullable:true})
  dateReturned:string;

  @ManyToOne(()=>User, (user)=>user.rentals)
  user:User;

  @ManyToOne(()=>Movie, (movie)=>movie.rentals )
  movie:Movie;

  @Column({nullable:true})
  userId:number;

 
  
}