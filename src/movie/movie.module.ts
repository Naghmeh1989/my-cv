import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from 'src/genres/genres.service';
import { Genre } from 'src/genres/genre.entity';
import { User } from 'src/users/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Movie]),
  TypeOrmModule.forFeature([Genre,User])],
  controllers: [MovieController],
  providers: [MovieService,GenresService]
})
export class MovieModule {}
