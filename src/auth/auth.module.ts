import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { config } from '../config/env.config';


@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: config().JWT_SECRET,
        signOptions:{expiresIn:config().JWT_LIFE_SPAN}
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtModule, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
