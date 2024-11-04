import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { CreateGenreSubscribtionDto } from './dtos/create-genre-subscribtion.dto';

@Controller('genres')
export class GenresController {
  constructor(private genresService:GenresService){}

  @Post()
  CreateGenreDto(@Body() body:CreateGenreDto){
    const { movieId } = body;
    return this.genresService.create(body,movieId);
  }

  @Get('/:id')
  async findOne(@Param('id') id:string){
    const genre = await this.genresService.findById(parseInt(id));
    if(!genre){
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }
  
  @Post('/subscribe')
  createGenreSubscribtion(@Body() body:CreateGenreSubscribtionDto){
    return this.genresService.createSubscribtion(body);
  }

}
