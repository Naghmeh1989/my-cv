import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { Movie } from 'src/movie/movie.entity';
import { CreateGenreSubscribtionDto } from './dtos/create-genre-subscribtion.dto';
import { User } from 'src/users/user.entity';


@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private genresRepository:Repository<Genre>,
  @InjectRepository(Movie) private moviesRepository:Repository<Movie>,
  @InjectRepository(User) private repo:Repository<User>
   ){}

   async create(createGenreDto:CreateGenreDto, movieId:number){
    const movie = await this.moviesRepository.findOneBy( {id:movieId} );
    if(!movie){
      throw new NotFoundException('Movie not found');
    }
    const genre = this.genresRepository.create(createGenreDto);
    genre.movies = genre.movies || [];
    genre.movies.push(movie);
    return this.genresRepository.save(genre);
  }

  findById(id:number){
    return this.genresRepository.findOneBy({id});
  }

  async createSubscribtion(createGenreSubscribtionDto:CreateGenreSubscribtionDto){
    const {userId,genreId} = createGenreSubscribtionDto;
   
    const user = await this.repo.findOneBy({id:userId});
    if(!user){
      throw new NotFoundException('User not found');
    }
    const genre = await this.genresRepository.findOneBy({id:genreId});
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
   user.genre= genre;
   return this.repo.save(user);
  }
  
  
}
