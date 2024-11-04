import { Controller, Post, Body, Get, Param} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { ApiTags } from '@nestjs/swagger';




@ApiTags('Rental')
@Controller('rental')
export class RentalController {
  constructor(
    private rentalService:RentalService 
  ){}

/* @Post()
  createRental(@Body() body:CreateRentalDto){
    const { userId, movieId } = body;
    return this.rentalService.createRental(body,userId,movieId);
  }*/

 @Get('users/:userId')
 getRentalByUser(@Param('userId') userId:number){
  return this.rentalService.find(userId);
 }
 @Post()
 createResponse(@Body() body:CreateRentalDto){
  const { userId, movieId } = body;
    return this.rentalService.createResponse(body,userId,movieId);
 }

}
