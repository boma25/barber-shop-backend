import { Controller, UseGuards, Get, Post, Put, Param, Body } from '@nestjs/common';
import { CreateBarberDto } from '../barber/Dto/create-barber.Dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/Roles/roles.decorator';
import { AdminService } from './admin.service';
import {UpdateBarberDto} from '../barber/Dto/update-barber.Dto'


@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('api/admin')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Roles('Admin')
    @Get('get-all-books')
    async getAllBooks(){
        return await this.adminService.getAllBooks()
    }

    @Roles('Admin')
    @Get('get-all-barbers')
    async getAllBarbers(){
        return this.adminService.getAllBarbers()
    }

    @Roles('Admin')
    @Post('create-barber')
    async createBarber(@Body() createBarberDto:CreateBarberDto){
        return this.adminService.createBarber(createBarberDto)
    }

    @Roles('Admin')
    @Put('update-barber/:id')
    async updateBarber(@Param() id, @Body() updateUserDto:UpdateBarberDto){
        return this.adminService.updateBarber(id.id, updateUserDto.number)
    }

}
