import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Barber,BarberDocument } from './Schema/barber.schema';
import { Model } from 'mongoose';
import { CreateBarberDto } from './Dto/create-barber.Dto';
import {FormatDate} from '../helper/date.helper'

@Injectable()
export class BarberService {
    constructor(@InjectModel(Barber.name) private barberModel:Model<BarberDocument>, private formatDate:FormatDate ){}

    async createBarber(createBarberDto:CreateBarberDto){
        try{
            const newBarber = new this.barberModel(createBarberDto)
            await newBarber.save()
            return "Barber added"
        }catch(error){
            if(error.message.split(" ")[0] === "E11000"){
                throw new HttpException('you have already created a barber for this dat to change this try updating the barber', HttpStatus.CONFLICT)
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getBarbersDay(date:Date){
        const list = await this.barberModel.find()
        let numberOfBarbers = 0

        list.forEach((value)=>{
            if(this.formatDate.compareDate(value.date,date)){
                return numberOfBarbers = value.number
            }
        })
        return numberOfBarbers
    }

    async getAllBarbers(){
        return await this.barberModel.find()
    }

    async updateBarber(id:string, number:number) {
        return this.barberModel.findOneAndUpdate({_id:id},{number:number},{returnOriginal: false})
    }
}
