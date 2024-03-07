import { Test, TestingModule } from '@nestjs/testing';
import { MessageRepository } from '@db/message/message.repository';
import { DbModule } from '@db/db.module';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { SigninDto, UserRepository } from '@db/user';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Db } from 'typeorm';
import * as config from '@config/config';
import { UserController } from './user.controller';
import { AuthModule } from '@auth/auth.module';
import { KafkaModule } from '@kafka/kafka.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/exception/http-exception.filter';
import { ResponseInterceptor } from '@common/interceptor/response.interceptor';

describe('UserService', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    // require('dotenv').config();
    // console.log("secret: ", config.JWTSECRET)
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule,
        AuthModule,
        UserModule,
      ],
      controllers: [AppController],
      providers: [AppService, MessageRepository

      ],
    }).compile();
    userController = app.get<UserController>(UserController);
  });

  let dto = new SigninDto("tom","1234")
  test('should be defined', async () => {
    
    const access_token = (await userController.signIn(dto)).access_token;
    console.log("access_token: ", access_token)

    let req:any = {query: {username: "tom"}, headers: {authorization: `Bearer ${access_token}`}}
    let profile:any = await userController.getProfile(req)
    console.log("profile: ", profile)
    
    expect(profile.username).toEqual("tom");
    expect(profile.role).toEqual(0);
  })
});
