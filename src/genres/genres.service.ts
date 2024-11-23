import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/users/user.entity';
import { CreateDto } from './dtos/create.dto';
import { MovieGenre } from 'src/middleEntities/movie_genre.entity';
import { UserGenre } from 'src/middleEntities/user_genre.entity';


@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private genresRepository:Repository<Genre>,
  @InjectRepository(Movie) private moviesRepository:Repository<Movie>,
  @InjectRepository(User) private usersRepository:Repository<User>,
  @InjectRepository(MovieGenre) private moviesGenresRepository:Repository<MovieGenre>,
  @InjectRepository(UserGenre) private usersGenresRepository:Repository<UserGenre>,
 
   ){}

   create(createDto:CreateDto){
    const genre = this.genresRepository.create(createDto);
    return this.genresRepository.save(genre);
   }

   async createGenre(createGenreDto:CreateGenreDto, movieId:number){
    const movie = await this.moviesRepository.findOneBy( {id:movieId} );
    if(!movie){
      throw new NotFoundException('Movie not found');
    }
    const genre = this.genresRepository.create(createGenreDto);
    genre.movies = genre.movies || [];
    genre.movies.push(movie);
    return this.genresRepository.save(genre);
  }

  async createMovieGenre(createMovieGenre:{movieId:number, genreId:number}){
    const genre = await this.genresRepository.findOne({where: {id: createMovieGenre.genreId}});
    if(!genre){
      throw new NotFoundException()
    }
    await this.moviesGenresRepository.save(createMovieGenre);
  }

  
  async createUserGenre(createUserGenre:{userId:number, genreId:number}){
    const genre = await this.genresRepository.findOne({where: {id: createUserGenre.genreId}});
    if(!genre){
      throw new NotFoundException()
    }
    await this.usersGenresRepository.save(createUserGenre);
  }

  findById(id:number){
    return this.genresRepository.findOneBy({id});
  }

  findByTitle(title:string){
    return this.genresRepository.findBy({title});
  }
  
  
   
  
}
