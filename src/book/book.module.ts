import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormatDate } from '../helper/date.helper';
import { BarberModule } from '../barber/barber.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema, Book } from './Schema/book.schema';


@Module({
    imports: [BarberModule ,MongooseModule.forFeature([{name:Book.name, schema:BookSchema},])],
    controllers: [BookController],
    providers: [BookService, FormatDate],
    exports: [BookService]
})
export class BookModule {}
