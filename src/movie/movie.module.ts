import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from 'src/genres/genres.service';
import { Genre } from 'src/genres/genre.entity';
import { User } from 'src/users/user.entity';
import { EmailService } from 'src/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie,Genre,User])],
  controllers: [MovieController],
  providers: [MovieService,GenresService,EmailService]
})
export class MovieModule {}
