import { Rental } from "src/rental/rental.entity";
import { Genre } from "src/genres/genre.entity";
import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToMany, JoinTable} from "typeorm";

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
  
}