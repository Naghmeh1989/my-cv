import { Module,MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { AddressModule } from './address/address.module';
import { Address } from './address/address.entity';
import { MovieModule } from './movie/movie.module';
import { RentalModule } from './rental/rental.module';
import { Movie } from './movie/movie.entity';
import { Rental } from './rental/rental.entity';
import { GenresModule } from './genres/genres.module';
import { Genre } from './genres/genre.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report, Address, Movie, Rental, Genre],
    synchronize: true

  }),
    UsersModule, ReportsModule, AddressModule, MovieModule, RentalModule, GenresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
 /* configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['asdfasfd'],
        }),
      )
      .forRoutes('*');
  }*/
}
