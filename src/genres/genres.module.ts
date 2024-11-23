import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genre } from './genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { MovieGenre } from 'src/middleEntities/movie_genre.entity';
import { UserGenre } from 'src/middleEntities/user_genre.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Genre,User,MovieGenre,UserGenre]),
  TypeOrmModule.forFeature([Movie])],
  providers: [GenresService],
  controllers: [GenresController]
})
export class GenresModule {}
