import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, Book } from './Schema/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './Dto/create-book.Dto';
import SerializeBook from '../helper/book.serializer';
import { BarberService } from '../barber/barber.service';
import { FormatDate } from '../helper/date.helper';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel:Model<BookDocument>, private barberService:BarberService, private formatDate:FormatDate ){}
    
    async getAllBooks(){
        const books = await this.bookModel.find().populate('user')
        if(books.length === 0){
            return books
        }
        return SerializeBook(books)
    }

    async newBook(createBookDto:CreateBookDto){
        const barbers_for_the_day = await this.barberService.getBarbersDay(createBookDto.date)
        const booksList = await this.getAllBooks()
        const bookedDay=[]
        booksList.forEach((value:BookDocument)=>{
            if(this.formatDate.compareDate(value.date,createBookDto.date)){
                bookedDay[bookedDay.length] = value
            }
        })
        const bookedTime=[]
        bookedDay.forEach((value)=>{
            if(value.time===createBookDto.time){
                bookedTime[bookedTime.length] = value
            }
        })
        if(bookedTime.length<barbers_for_the_day){
            try{
                const book = new this.bookModel(createBookDto)
                book.save()
                return 'your booking was successfully'
            }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
        }
        throw new HttpException('No more available barbers for this time try a different time', HttpStatus.EXPECTATION_FAILED)
    }

}
