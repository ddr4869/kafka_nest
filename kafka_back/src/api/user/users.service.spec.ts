import { Test, TestingModule } from '@nestjs/testing';
import { MessageRepository } from '@db/message/message.repository';
import { DbModule } from '@db/db.module';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '@auth/auth.module';
import { access } from 'fs';
import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/exception/http-exception.filter';
import { ResponseInterceptor } from '@common/interceptor/response.interceptor';
import { AuthGuard } from '@auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';


export const mockAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request['user'] = { id: 1 };
    return true;
  }
}

export const hash = async (plainText: string): Promise<string> => {
  const saltOrRounds = 10;
  let result = await bcrypt.hash(plainText, saltOrRounds)
  return result;
};

export const isHashValid = async (password, hashPassword): Promise<boolean> => {
  let result = await bcrypt.compare(password, hashPassword);
  return result;
};

describe('UserService', () => {
  let userController: UserController;
  let userService: UserService;
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  beforeEach(async () => {

    jwtService = new JwtService();
    authGuard = new AuthGuard(jwtService);


    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule,
        AuthModule,
        UserModule,
      ],
      controllers: [],
      providers: [MessageRepository,
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ResponseInterceptor,
        },
      ],
    })
    .overrideGuard(AuthGuard).useValue(authGuard)
    .compile();


    userController = app.get<UserController>(UserController);
  });

  let access_token
  test('login', async () => {
    let data  = await userController.signIn({username: "tom", password: "1234"})
    access_token = data.access_token
    expect(access_token).toBeDefined();
    jest
  })


  test('profile', async () => {
    let req:any = {query: {username: "tom"}, headers: {authorization: `Bearer ${access_token}`}}
    let profile:any = await userController.getProfile(req)
    
    expect(profile.username).toEqual("tom");
    expect(profile.role).toEqual(0);
  })

});
