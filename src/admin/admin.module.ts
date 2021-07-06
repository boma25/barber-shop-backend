import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BarberModule } from 'src/barber/barber.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [BarberModule, BookModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
