import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BarberService } from './barber.service';
import { BarberSchema, Barber } from './Schema/barber.schema';
import { FormatDate } from '../helper/date.helper';

@Module({
  imports: [MongooseModule.forFeature([{name:Barber.name, schema:BarberSchema}])],
  providers: [BarberService, FormatDate],
  exports: [BarberService]
})
export class BarberModule {}
