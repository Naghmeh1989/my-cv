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


@Module({
  imports: [TypeOrmModule.forFeature([Rental]),
  TypeOrmModule.forFeature([Movie]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Genre])
  ],
  controllers: [RentalController],
  providers: [RentalService,MovieService,UsersService,GenresService]
})
export class RentalModule {}
