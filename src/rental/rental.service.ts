import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { UsersService } from 'src/users/users.service';
import { MovieService } from 'src/movie/movie.service';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { CreateResponseDto } from './dtos/create-response.dto';
import { ResponseDto } from './dtos/response.dto';


@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental) private rentalRepository:Repository<Rental>,
     private usersService:UsersService,
     private movieService:MovieService,
    
  ){}

  /*async createRental(rentalDto:CreateRentalDto, userId:number, movieId:number){
    const user = await this.usersService.findOne(userId);
    if(!user){
      throw new NotFoundException('User not found');
    }
   
    const movie = await this.movieService.findOne(movieId);
    if(!movie){
      throw new NotFoundException('Movie not found');
    }
    const rental = await this.rentalRepository.create(rentalDto);
    rental.user = user;
    rental.movie= movie;
    return  this.rentalRepository.save(rental);
  }*/

 /* async find(userId:number){
    const user = await this.usersService.findOne(userId);
    if(!user){
      throw new NotFoundException('User not found');
    }
    const rentals = await this.rentalRepository.find({ where: { userId: user.id },relations: ['movie'] });
    const result = rentals.map(rental => ({
      rentalDateStart: rental.dateStart,
      rentalDateReturned: rental.dateReturned,
      user: {
          
          name: user.name,
          surname: user.surname,
          email: user.email
      },
      movie: {
          
          title: rental.movie.title
      }
  }));
  return result;
  }*/


  async createResponse(rentalDto:CreateRentalDto,userId:number, movieId:number){
    const user = await this.usersService.findOne(userId);
    if(!user){
      throw new NotFoundException('User not found');
    }
   
    const movie = await this.movieService.findOne(movieId);
    if(!movie){
      throw new NotFoundException('Movie not found');
    }
    const rental = await this.rentalRepository.create(rentalDto);
     rental.user = user;
    rental.movie= movie;
    await  this.rentalRepository.save(rental);
    const response : ResponseDto = {
      userName : user.name,
      userSurname: user.surname,
      userEmail: user.email,
      dateStart: rental.dateStart,
      dateReturned: rental.dateReturned,
      movieTitle: movie.title


    }
    return response;
    
    
  }
 
    async find(userId:number){
      const user = await this.usersService.findOne(userId);
      if(!user){
        throw new NotFoundException('User not found');
      }
      const rental = await this.rentalRepository.find({ where: { userId: user.id },relations: ['movie'] });
      return rental;
    }
}
