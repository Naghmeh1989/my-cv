import { Entity,Column,PrimaryGeneratedColumn,OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Report } from "src/reports/report.entity";
import { Address } from "src/address/address.entity";
import { Rental } from "src/rental/rental.entity";
import { Genre } from "src/genres/genre.entity";
import { Movie } from "src/movie/movie.entity";
import { MovieGenre } from "src/middleEntities/movie_genre.entity";
import { UserGenre } from "src/middleEntities/user_genre.entity";
import { UserMovie } from "src/middleEntities/user_movie.entity";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  email: string;

  @Column({nullable:true})
  name: string;

  @Column({nullable:true})
  surname: string;

  @Column({nullable:true})
  mobileNumber: number;

  @Column({default:true})
  admin:boolean;

  
  @Column()
  password:string;

  @Column({ nullable: true })
  countryCode:number;

  @Column({nullable:true})
  profileImage:string;

  @OneToMany(()=>Report, (report)=>report.user)
  reports: Report[];

  @OneToMany(()=>Address, (address)=>address.user)
  addresses: Address[];

  @OneToMany(()=>Rental, (rental)=>rental.user)
  rentals:Rental[];

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @ManyToMany(()=>Genre, (genre)=>genre.subscribedUser,{ cascade: true })
  @JoinTable()
  subscribedGenre:Genre[];

  @ManyToMany(()=>Movie, (movie)=>movie.subscribedUser, { cascade:true})
  @JoinTable()
  subscribedMovie:Movie[];

  @OneToMany(()=>UserGenre , (userGenre)=>userGenre.user)
  userGenre: UserGenre[];

  @OneToMany(()=>UserMovie , (userMovie)=>userMovie.user)
  userMovie: UserMovie[];
}