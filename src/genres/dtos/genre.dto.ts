import { Expose } from "class-transformer";

import { ApiProperty } from '@nestjs/swagger';

export class GenreDto{
  @ApiProperty()
  @Expose()
  title:string;

  @ApiProperty()
  @Expose()
  isActive:boolean;
}