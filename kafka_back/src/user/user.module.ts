import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '@db/user/user.repository';
import { UserController } from './user.controller';

@Module({
  imports : [],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
