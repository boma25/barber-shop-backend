import { Controller, Get,Post, UseGuards, Body } from '@nestjs/common';
import {UserService} from './user.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBookDto } from '../book/Dto/create-book.Dto';
import { Roles } from '../auth/Roles/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {
    constructor(private userService:UserService){}

    @Roles('User')
    @Post('book')
    async Book(@Body() createBookDto:CreateBookDto){
        return await this.userService.Book(createBookDto)
    }

    
}
