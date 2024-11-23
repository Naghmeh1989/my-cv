import { Module } from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './services/email.service';
import { MovieGenre } from './middleEntities/movie_genre.entity';
import { UserGenre } from './middleEntities/user_genre.entity';
import { UserMovie } from './middleEntities/user_movie.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report, Address, Movie, Rental, Genre, MovieGenre, UserGenre, UserMovie],
    synchronize: true

  }),
  MailerModule.forRoot({
    transport: {
      host: 'sandbox.smtp.mailtrap.io',  
      port: 2525,                        
      auth: {
        user: '54b5abaf50a933',  
        pass: 'eaa11c2447bc92',  
      }
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',  
    },
    preview: false, 
  }),
  ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule, ReportsModule, AddressModule, MovieModule, RentalModule, GenresModule],
  controllers: [AppController],
  providers: [AppService,EmailService],
  exports:[EmailService]
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
