import { Injectable , BadRequestException,NotFoundException} from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes , scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
  constructor( private usersService:UsersService,
    @InjectRepository(User) private usersRepository:Repository<User>
  ){}
  async signup(email:string , password:string){
    const users= await this.usersService.find(email);
    if(users.length){
      throw new BadRequestException('user in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.usersRepository.create({email,password:result});
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  async signin(email:string , password:string){
    const [user] = await this.usersService.find(email);
    if(!user){
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash]= user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if(storedHash!== hash.toString('hex')){
      throw new BadRequestException('bad password');
    }
    return user;
    
  }


  
}