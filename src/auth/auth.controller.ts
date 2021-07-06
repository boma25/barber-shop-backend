import { Controller, Get,Post,Body, UseGuards, Request, } from '@nestjs/common';
import { CreateUserDto } from '../user/Dto/create-user-Dto';
import {UserService} from '../user/user.service'
import {AuthService} from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './Roles/roles.decorator';


@Controller('api/auth')
export class AuthController {
    constructor(private userService:UserService, private authService:AuthService){}

    @Post('signUp')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser({...createUserDto, email:createUserDto.email.toLowerCase()})
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() createUserDto:CreateUserDto){
        return await this.authService.login({...createUserDto, email:createUserDto.email.toLowerCase()})
    }

}
