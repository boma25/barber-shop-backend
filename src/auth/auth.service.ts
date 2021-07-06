import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/Dto/create-user-Dto';
import { PasswordProtection } from '../helper/password.protection';
import SerializeUser from '../helper/user.serializer';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private userService:UserService, private jwtService: JwtService){}

    async validateUser(email:string,password:string){
        const user =await this.userService.findOne(email)
        if(user && await PasswordProtection.validate(password,user.password)){
            return SerializeUser(user)
        }
        return null
    }
    
    async login(user:any){
        const payload = {email: user.email, sub: user._id}
        const newUser =SerializeUser(await this.userService.findOne(user.email))
        return{
            access_token: this.jwtService.sign(payload),
            user:newUser
        }
    }
}
