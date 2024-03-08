import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '@db/user/user.repository';
import { UserController } from './user.controller';
import { FriendRepository } from '@db/friend/friend.repository';

@Module({
  imports : [],
  providers: [UserService, UserRepository, FriendRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
