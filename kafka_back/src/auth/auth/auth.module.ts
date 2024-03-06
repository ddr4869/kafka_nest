import { Module } from '@nestjs/common';
import { UserModule } from '@user';
//import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as config from '@config/config';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: config.JWTSECRET,
            signOptions: { expiresIn: config.JWTEXPIRE },
        })
    ],
})
export class AuthModule {}
