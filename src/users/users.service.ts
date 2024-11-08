import { Injectable , NotFoundException,BadRequestException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateGenresSubscribtionDto } from './dtos/create-genres-subscribtion.dto';
import { Genre } from 'src/genres/genre.entity';
import { Movie } from 'src/movie/movie.entity';
import { MailerService } from '@nestjs-modules/mailer';


const scrypt = promisify(_scrypt);


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository:Repository<User>,
  @InjectRepository(Genre) private genresRepository:Repository<Genre>,
  @InjectRepository(Movie) private moviesRepository:Repository<Movie>,
  private readonly mailService: MailerService

 ){}
 /* create(email: string , password: string){
    const user = this.repo.create({email,password});
    return this.repo.save(user);

  }*/

    create(createUserDto:CreateUserDto){
      const user = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(user);
    }
 
  

  findOne(id:number){
    if(!id){
      return null;
    }
    return this.usersRepository.findOneBy({id});
  }

  find(email:string){
    return this.usersRepository.findBy({email});
  }

  async update(id: number, attrs:Partial<User>){
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException('user not found');
    }
    Object.assign(user,attrs);
    return this.usersRepository.save(user);
  }

  async remove(id:number){
    const user = await this.findOne(id);
    if(!user){ 
      throw new NotFoundException('user not found');
    }
    return this.usersRepository.remove(user);
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = randomBytes(32).toString('hex');
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1); 

  
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = expirationTime;
    await this.usersRepository.save(user);
    console.log(`Reset token: http://localhost:3000/reset-password?token=${resetToken}`);

    return  'Password reset link sent to email' ;
  }

   async createSubscribtion(createGenresSubscribtionDto:CreateGenresSubscribtionDto){
    const {userId,genreId} = createGenresSubscribtionDto;
   
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['subscribedGenre']
    });
    if(!user){
      throw new NotFoundException('User not found');
    }
    const genre = await this.genresRepository.findOneBy({id:genreId});
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
   user.subscribedGenre = user.subscribedGenre || [];
   user.subscribedGenre.push(genre);
   return this.usersRepository.save(user);
  }

  async resetPassword(token: string, newPassword: string) {
    
    const user = await this.usersRepository.findOne({where: {
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
       await this.usersRepository.save(user);
   
       return  'Password successfully reset' ;
     }
   }


function MoreThan(arg0: Date): Date | import("typeorm").FindOperator<Date> {
  throw new Error('Function not implemented.');
}

