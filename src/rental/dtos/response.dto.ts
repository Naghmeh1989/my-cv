import { Expose, Transform } from "class-transformer";


export class ResponseDto{
  @Expose()
  dateStart:string;

  @Expose()
  dateReturned:string;

  @Expose()
  @Transform(({obj})=>obj.user.id)
  userName:string;

  @Expose()
  @Transform(({obj})=>obj.user.id)
  userSurname:string;

  @Expose()
  @Transform(({obj})=>obj.user.id)
  userEmail:string;

  @Expose()
  @Transform(({obj})=>obj.movie.id)
  movieTitle:string;
}