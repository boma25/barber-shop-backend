import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User, UserDocument} from './schemas/user.schema'
import { CreateUserDto } from './Dto/create-user-Dto';
import SerializeUser from '../helper/user.serializer'
import { UserInterface } from './interface/user.interface';
import { CreateBookDto } from '../book/Dto/create-book.Dto';
import { BookService } from '../book/book.service';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private bookService: BookService){}

    async createUser(createUserDto:CreateUserDto):Promise<UserInterface|string>{
        try{
            const newUser = new this.userModel(createUserDto)
            const user = await newUser.save()
            return SerializeUser({...user})
            
        }catch(error){
            console.log(error)
            if(error.message.split(" ")[0] === "E11000"){
                return ` A user with this email ${error.keyValue.email} already exists`
            }
            return error.message
        }
    }

    async findOne(email:string){
        try{
            const user = await this.userModel.findOne({email})
            return user
        }catch(error){
            return error.message
        }
    }

    async Book(createBookDto:CreateBookDto){
        try{
            const user = await this.userModel.findById(createBookDto.user)
            if(!user){
                return "invalid user"
            }
            return await this.bookService.newBook({...createBookDto, user:user._id})
        }catch(error){
            return error
        }
    }

    async getAllBooks(){
        return await this.bookService.getAllBooks()
    }
}
