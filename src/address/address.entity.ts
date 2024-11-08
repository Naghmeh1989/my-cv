import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";
@Entity()
export class Address{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  streetName: string;

  @Column()
  houseNumber: number;

  @Column()
  flatNumber: number;

  @Column()
  postcode: string;

  @ManyToOne(()=>User ,(user)=>user.addresses)
  user: User;

  @Column({nullable:true})
  userId:number;
}