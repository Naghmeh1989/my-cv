import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Genre } from 'src/genres/genre.entity';
import { GenresService } from 'src/genres/genres.service';
import { CreateGenreDto } from 'src/genres/dtos/create-genre.dto';
import { CreateMovieGenreDto } from './dtos/create-movie-genre.dto';
import { User } from 'src/users/user.entity';
import { SendRecommendationDto } from './dtos/send-movie-recommendation.dto'; 
import { EmailService } from 'src/services/email.service';
import { MovieGenre } from 'src/middleEntities/movie_genre.entity';
import { UserMovie } from 'src/middleEntities/user_movie.entity';
import { GetMovieDto } from './dtos/get-movie.dto';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private moviesRepository:Repository<Movie>,
  @InjectRepository(Genre) private genresRepository:Repository<Genre>,
  @InjectRepository(User) private usersRepository:Repository<User>,
  @InjectRepository(MovieGenre) private moviesGenresRepository:Repository<MovieGenre>,
  @InjectRepository(UserMovie) private usersMoviesRepository:Repository<UserMovie>,
  private genresService:GenresService ,
  private readonly emailService: EmailService
  ){}

  createMovie(title:string){
    const movie = this.moviesRepository.create({title});
    return this.moviesRepository.save(movie);
  }
  
  async create(createMovieDto:CreateMovieDto){
    const{genreIds} = createMovieDto;
    const genres = [];
    for(const genreId of genreIds ){
    const genre = await this.genresRepository.findOneBy({ id: genreId });
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    genres.push(genre);
   }
    const movie = this.moviesRepository.create(createMovieDto);
    movie.genres=genres;
    return this.moviesRepository.save(movie);
   
  }

  async createMovieGenre(createMovieGenre:{movieId:number, genreIds:number[]}){
    const movie = await this.moviesRepository.findOne({where: {id: createMovieGenre.movieId}});
    if(!movie){
      throw new NotFoundException()
    }
    await this.moviesGenresRepository.save(createMovieGenre);
  
  }

   
  async createUserMovie(createUserMovie:{userId:number, movieId:number}){
    const movie = await this.genresRepository.findOne({where: {id: createUserMovie.movieId}});
    if(!movie){
      throw new NotFoundException()
    }
    await this.usersMoviesRepository.save(createUserMovie);
  }


  async createMovieAndRecommendation(createMovieDto:CreateMovieDto){
    const{genreIds} = createMovieDto;
    const genres = [];
    const genreTitles = [];
   
    for(const genreId of genreIds ){
      const genre = await this.genresRepository.findOneBy({ id: genreId });
      if(!genre){
        throw new NotFoundException('Genre not found');
      }
    
      genres.push(genre);
      genreTitles.push(genre.title);
      
      
    }
      const movie = this.moviesRepository.create(createMovieDto);
      movie.genres=genres;
      await this.moviesRepository.save(movie);
      
      for(const genreId of genreIds ){
      const subscribedUser = await this.usersRepository.find({
        where: {
          subscribedGenre: { id: genreId } 
       } 
      });
  
      for (const user of subscribedUser ) {
        await this.emailService.movieRecommendation(user.email,
          `New Movie in ${genreTitles} Genre: ${movie.title}`,
          {name:user.name,movieTitle:movie.title,genreName:genreTitles});
        
       user.subscribedMovie =  user.subscribedMovie|| [];
       user.subscribedMovie.push(movie);
       await this.usersRepository.save(user);
       
      }
    }
      return movie;
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


 /* async findByGenreTitle(getMovie:GetMovieDto){
    const {genreTitle,movieTitle}=getMovie;
    const genre = await this.genresService.findByTitle(genreTitle);
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    return this.moviesRepository.createQueryBuilder('movie')
    .leftJoinAndSelect('movie.genres', 'genre')
    .where('genre.title = :genreTitle', { genreTitle })
    .andWhere('movie.title = :movieTitle', {movieTitle})
    .getMany();
  }*/

  async findByGenreTitle(getMovie:GetMovieDto){
    const {genreTitle,movieTitle}=getMovie;
    if(genreTitle && movieTitle){
    const genre = await this.genresService.findByTitle(genreTitle);
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    return this.moviesRepository.createQueryBuilder('movie')
    .leftJoinAndSelect('movie.genres', 'genre')
    .where('genre.title = :genreTitle', { genreTitle })
    .andWhere('movie.title = :movieTitle', {movieTitle})
    .getMany();
    }else if(genreTitle){
      const genre = await this.genresService.findByTitle(genreTitle);
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    return this.moviesRepository.createQueryBuilder('movie')
    .leftJoinAndSelect('movie.genres', 'genre')
    .where('genre.title = :genreTitle', { genreTitle })
    .getMany();
    }else if(movieTitle){
      return this.moviesRepository.createQueryBuilder('movie')
      .where('movie.title = :movieTitle', {movieTitle})
      .getMany();
    }else{
      return this.moviesRepository.createQueryBuilder('movie')
      .select('*')
      .getRawMany();

    }
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


