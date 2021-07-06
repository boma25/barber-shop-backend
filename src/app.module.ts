import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import {config} from './config/env.config'
import { BarberModule } from './barber/barber.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ AuthModule, UserModule, BookModule, ConfigModule.forRoot({
    isGlobal:true,
  }), MongooseModule.forRoot(config().DB_URI,{ useCreateIndex: true, autoIndex:true, useFindAndModify:false }), BarberModule, AdminModule],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
