import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User} from './user.entity';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { Genre } from 'src/genres/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Genre])],
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}

