import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './user/auth/auth.service';
import { Auth,user,book,berbersService } from './auth,user,book,berbers/auth,user,book,berbers.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { BookService } from './book/book.service';
import { BarberService } from './barber/barber.service';
import { BarberModule } from './barber/barber.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { BookController } from './book/book.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [BarberModule, AuthModule, UserModule, BookModule],
  controllers: [AppController, AuthController, UserController, BookController],
  providers: [AppService, AuthService, Auth,user,book,berbersService, UserService, BookService, BarberService],
})
export class AppModule {}
