import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from 'src/genres/genres.service';
import { Genre } from 'src/genres/genre.entity';
import { User } from 'src/users/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [TypeOrmModule.forFeature([Movie,Genre,User]),
   /* MailerModule.forRoot({
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
    })*/
  ],
  controllers: [MovieController],
  providers: [MovieService,GenresService]
})
export class MovieModule {}
