import { Entity,Column,PrimaryGeneratedColumn,OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Report } from "src/reports/report.entity";
import { Address } from "src/address/address.entity";
import { Rental } from "src/rental/rental.entity";
import { Genre } from "src/genres/genre.entity";



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

  @ManyToMany(()=>Genre, (genre)=>genre.user,{ cascade: true })
  @JoinTable()
  genre:Genre;

  
}