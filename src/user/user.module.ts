import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema, User } from './schemas/user.schema';
import { BookModule } from '../book/book.module';

@Module({
    imports: [BookModule, MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
