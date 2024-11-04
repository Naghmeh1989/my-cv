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

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private moviesRepository:Repository<Movie>,
  @InjectRepository(Genre) private genresRepository:Repository<Genre>,
  @InjectRepository(User) private repo:Repository<User>,
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


 /* async create(createMovieDto:CreateMovieDto, genreId:number){
    const genre = await this.genresRepository.findOneBy({ id: genreId });
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    const movie = this.moviesRepository.create(createMovieDto);
    movie.genres = movie.genres || [];
    movie.genres.push(genre);
    await this.moviesRepository.save(movie);
    const users = await this.repo.find({
      where: {
        subscribedGenre: { id: genre.id },
      },
      relations: ['subscribedGenre'],
    });

    // Send an email to each subscribed user
    for (const user of users) {
      await this.sendEmail(user.email, genre.title, movie.title);
    }
    return movie;
    
  }
  private async sendEmail(email: string, genreName: string, movieTitle: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: `New Movie in Your Subscribed Genre: ${genreName}`,
        text: `A new movie titled "${movieTitle}" has been added to the genre "${genreName}". Check it out!`,
        html: `<p>A new movie titled "<strong>${movieTitle}</strong>" has been added to your subscribed genre "<strong>${genreName}</strong>". Check it out!</p>`,
      });
    } catch (error) {
      console.error(`Failed to send email to ${email}`, error);
    }
  }*/
  
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
