import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { CreateGenreDto } from 'src/genres/dtos/create-genre.dto';
import { CreateMovieGenreDto } from './dtos/create-movie-genre.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private movieService:MovieService){}

  @Post()
  createMovie(@Body() body:CreateMovieDto){
    const {genreId} = body;
    return this.movieService.create(body,genreId);
  }

  @Post('/with-genre')
  createMovieAndGenre(@Body() body:CreateMovieGenreDto){
    return this.movieService.createMovieAndGenre(body);
  }

  @Get('/:id')
  findOne(@Param('id') id:string){
    return this.movieService.findOne(parseInt(id));
  }

  @Get('genres/:genreId')
  findMovieByGenre(@Param('genreId') genreId:number){
    return this.movieService.findByGenre(genreId);
  }
}
