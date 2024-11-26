import { Controller, Post, Body, Get, Param, NotFoundException, Query } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDto } from './dtos/create.dto';


@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private genresService:GenresService){}

  @Post('create')
  create(@Body() body:CreateDto){
  return this.genresService.create(body);
  }

  @Post()
  createGenre(@Body() body:CreateGenreDto){
    const { movieId } = body;
    return this.genresService.createGenre(body,movieId);
  }

  

  @Post('create-movie-genre')
  async createMovieGenre(@Body() createMovieGenre:{movieId:number, genreId:number}){
    await this.genresService.createMovieGenre(createMovieGenre);
  }

  @Post('create-user-genre')
  async createUserGenre(@Body() createUserGenre:{userId:number, genreId:number}){
    await this.genresService.createUserGenre(createUserGenre);
  }

  @Get('/:id')
  async findOne(@Param('id') id:string){
    const genre = await this.genresService.findById(parseInt(id));
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }
  @Get()
  async findByTitle(@Query('title') title:string){
    const genre = await this.genresService.findByTitle(title);
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }
  


}
