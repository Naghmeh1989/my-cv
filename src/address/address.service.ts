import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dtos/create-address.dto';
import { User } from 'src/users/user.entity';
import { GetAddressDto } from './dtos/get-address.dto';


@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private addressRepository:Repository<Address>){}
  create(addressDto:CreateAddressDto, userId:number){
    const address = this.addressRepository.create(addressDto);
    address.userId= userId;
    return this.addressRepository.save(address);
  }

  async changeAddress(id:string, attrs: Partial<Address>){
    const address = await this.addressRepository.findOne({where:{id:parseInt(id)}});
    if(!address){
     throw new NotFoundException('address not found');
    }
    Object.assign(address,attrs);
    return this.addressRepository.save(address);
   
  }

  getAddress({country,city,streetName,houseNumber,flatNumber,postcode}:GetAddressDto){
    return this.addressRepository.createQueryBuilder()
    .select('*')
    .where('country = :country',{country})
    .andWhere('city = :city', {city})
    .andWhere('streetName = :streetName', {streetName})
    .andWhere('houseNumber = :houseNumber', {houseNumber})
    .andWhere('flatNumber = :flatNumber', {flatNumber})
    .andWhere('postcode = :postcode', {postcode})
    .getRawMany();
  }
}