import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { Db } from 'typeorm';
import { DbModule } from './db/db.module';
import { MessageRepository } from './db/message/message.repository';
import { ProducerService } from './kafka/producer.service';
import { ConsumerService } from './kafka/consumer.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { AuthModule } from './apps/main/src/auth/auth.module';
import { UsersModule } from './apps/main/src/users/users.module';

@Module({
  imports: [
    KafkaModule,
    DbModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageRepository],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude(
      { path : '/', method: RequestMethod.GET }
    ).forRoutes('*');
  }
}