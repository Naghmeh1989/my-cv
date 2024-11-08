import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User} from './user.entity';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { Genre } from 'src/genres/genre.entity';
import { Movie } from 'src/movie/movie.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([User,Genre,Movie]),
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
  })],
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}

