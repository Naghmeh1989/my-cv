import { Expose, Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';


export class ReportDto{
  @ApiProperty()
  @Expose()
  make:string;

  @ApiProperty()
  @Expose()
  model:string;

  @ApiProperty()
  @Expose()
  year:number;

  @ApiProperty()
  @Expose()
  lng:number;

  @ApiProperty()
  @Expose()
  lat:number;

  @ApiProperty()
  @Expose()
  mileage:number;

  @ApiProperty()
  @Expose()
  price:number;
  
  @ApiProperty()
  @Expose()
  approved:boolean;
  
  @ApiProperty()
  @Transform(({obj})=> obj.user.id)
  @Expose()
  userId:number;
}