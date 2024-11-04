import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString} from "class-validator";
import { User } from "src/users/user.entity";

export class CreateGenreSubscribtionDto{
  @IsNumber()
  genreId:number;
  
  @Transform(({obj})=>obj.userId)
  @IsNumber()
  userId:number;

}