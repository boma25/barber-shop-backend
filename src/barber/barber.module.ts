import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller';

@Module({
  controllers: [BarberController]
})
export class BarberModule {}
