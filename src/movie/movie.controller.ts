import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { CreateMovieGenreDto } from './dtos/create-movie-genre.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetMovieDto } from 'src/users/dtos/get-movie.dto';



@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private movieService:MovieService){}


  @Post('create-movie')
  createMovie(@Body('title') title:string){
    return this.movieService.createMovie(title);
  }
  @Post()
  create(@Body() body:CreateMovieDto){
    return this.movieService.create(body);
  }

  @Post('create-movie-genre')
  async createMovieGenre(@Body() createMovieGenre:{movieId:number, genreIds:number[]}){
    await this.movieService.createMovieGenre(createMovieGenre);
  }

  @Post('/with-genre')
  createMovieAndGenre(@Body() body:CreateMovieGenreDto){
    return this.movieService.createMovieAndGenre(body);
  }

  @Post('movie-recommendation')
  movieRecommendation(@Body() body:CreateMovieDto){
    return this.movieService.createMovieAndRecommendation(body);
  }



  @Get('/:id')
  findOne(@Param('id') id:string){
    return this.movieService.findOne(parseInt(id));
  }

  @Get('genres/:genreId')
  findMovieByGenre(@Param('genreId') genreId:number){
    return this.movieService.findByGenre(genreId);
  }


  @Get()
  findMovieByGenreTitle(@Body() body:GetMovieDto){
    return this.movieService.findByGenreTitle(body);
  }
}
