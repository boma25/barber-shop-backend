import { Injectable } from '@nestjs/common';
import { CreateBarberDto } from '../barber/Dto/create-barber.Dto';
import { BarberService } from '../barber/barber.service';
import { BookService } from '../book/book.service';

@Injectable()
export class AdminService {
    constructor(private bookService:BookService, private barberService:BarberService){}

    async getAllBooks(){
        return await this.bookService.getAllBooks()
    }

    async getAllBarbers(){
        return await this.barberService.getAllBarbers()
    }

    async createBarber(createBarberDto:CreateBarberDto){
        return await this.barberService.createBarber(createBarberDto)
    }

    async updateBarber(id:string, number:number){
        await this.barberService.updateBarber(id,number)
        return 'barber updated successfully'
    }

}
