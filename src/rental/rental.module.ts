import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { Rental } from './rental.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from 'src/movie/movie.service';
import { UsersService } from 'src/users/users.service';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/users/user.entity';
import { Genre } from 'src/genres/genre.entity';
import { GenresService } from 'src/genres/genres.service';
import { EmailService } from 'src/services/email.service';
import { MovieGenre } from 'src/middleEntities/movie_genre.entity';
import { UserMovie } from 'src/middleEntities/user_movie.entity';
import { UserGenre } from 'src/middleEntities/user_genre.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Rental]),
  TypeOrmModule.forFeature([Movie,MovieGenre,UserMovie,UserGenre]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Genre])
  ],
  controllers: [RentalController],
  providers: [RentalService,MovieService,UsersService,GenresService,EmailService]
})
export class RentalModule {}
