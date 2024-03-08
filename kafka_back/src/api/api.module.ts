import { Module } from '@nestjs/common';
import { KafkaModule } from '@kafka';
import { BoardModule } from '@board/board.module';
import { UserModule } from '@user';

@Module({
  imports : [UserModule, KafkaModule, BoardModule],
//   providers: [UserService, UserRepository, FriendRepository],
//   controllers: [UserController],
//   exports: [UserModule, KafkaModule],
})
export class ApiModule {}
