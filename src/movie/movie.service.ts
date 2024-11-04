import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Genre } from 'src/genres/genre.entity';
import { GenresService } from 'src/genres/genres.service';
import { CreateGenreDto } from 'src/genres/dtos/create-genre.dto';
import { CreateMovieGenreDto } from './dtos/create-movie-genre.dto';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private moviesRepository:Repository<Movie>,
  @InjectRepository(Genre) private genresRepository:Repository<Genre>,
  private genresService:GenresService
   
  ){}
  async create(createMovieDto:CreateMovieDto, genreId:number){
    const genre = await this.genresRepository.findOneBy({ id: genreId });
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    const movie = this.moviesRepository.create(createMovieDto);
    movie.genres = movie.genres || [];
    movie.genres.push(genre);
    return this.moviesRepository.save(movie);
  }
  
  findOne(id:number){
    return this.moviesRepository.findOneBy({id});
  }

  async findByGenre(genreId:number){
    const genre = await this.genresService.findById(genreId);
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    return this.moviesRepository.createQueryBuilder('movie')
    .leftJoinAndSelect('movie.genres', 'genre')
    .where('genre.id = :genreId', { genreId })
    .getMany();

  }
  async createMovieAndGenre(createMovieGenreDto:CreateMovieGenreDto){
  const { title, genres } = createMovieGenreDto;
  const genreEntities = genres.map((title)=>{
    const genre = new Genre();
    genre.title = title;
    return genre;
  })
  const savedGenre = await this.genresRepository.save(genreEntities);
  const movie = new Movie();
  movie.title = title;
  movie.genres = savedGenre;
  return this.moviesRepository.save(movie);
 }
  

}
