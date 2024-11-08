import { Controller, Post, Body,Param, Patch, Get, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { ChangeAddressDto } from './dtos/change-address.dto';
import { GetAddressDto } from './dtos/get-address.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressService:AddressService){}

  @Post()
  createAddress(@Body() body:CreateAddressDto){
    const {userId} = body;
    return this.addressService.create(body,userId);
  }

  @Patch('/:id')
  changeAddress(@Param('id') id:string,@Body() body:ChangeAddressDto){
    return this.addressService.changeAddress(id,body);
  }

  @Get()
  getAddress(@Query() query:GetAddressDto){
    return this.addressService.getAddress(query);
  }


}
