import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@user';
//import { AuthController } from './auth.controller';
import { AuthController } from '@auth/auth.controller'
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],

})
export class AuthModule {}
