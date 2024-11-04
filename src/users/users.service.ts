import { Injectable , NotFoundException,BadRequestException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';


const scrypt = promisify(_scrypt);


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo:Repository<User>){}
 /* create(email: string , password: string){
    const user = this.repo.create({email,password});
    return this.repo.save(user);

  }*/

    create(createUserDto:CreateUserDto){
      const user = this.repo.create(createUserDto);
      return this.repo.save(user);
    }
 
  

  findOne(id:number){
    if(!id){
      return null;
    }
    return this.repo.findOneBy({id});
  }

  find(email:string){
    return this.repo.findBy({email});
  }

  async update(id: number, attrs:Partial<User>){
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException('user not found');
    }
    Object.assign(user,attrs);
    return this.repo.save(user);
  }

  async remove(id:number){
    const user = await this.findOne(id);
    if(!user){ 
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }

  async forgotPassword(email: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = randomBytes(32).toString('hex');
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1); 

  
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = expirationTime;
    await this.repo.save(user);
    console.log(`Reset token: http://localhost:3000/reset-password?token=${resetToken}`);

    return  'Password reset link sent to email' ;
  }

  async resetPassword(token: string, newPassword: string) {
    
    const user = await this.repo.findOne({where: {
      resetPasswordToken: token,
      resetPasswordExpires: MoreThan(new Date()), 
    },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(newPassword, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

       user.password = hashedPassword;
       user.resetPasswordToken = null;
       user.resetPasswordExpires = null;
       await this.repo.save(user);
   
       return  'Password successfully reset' ;
     }
   }


function MoreThan(arg0: Date): Date | import("typeorm").FindOperator<Date> {
  throw new Error('Function not implemented.');
}

