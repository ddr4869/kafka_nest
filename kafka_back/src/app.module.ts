import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageRepository } from './db/message/message.repository';
import { LoggerMiddleware } from './common/logger.middleware';
import { AuthModule } from '@auth';
import { UserModule } from '@user/user.module';

import { ProducerService, ConsumerService, KafkaModule } from '@kafka';
import { DbModule } from '@db';

@Module({
  imports: [
    KafkaModule,
    DbModule,
    AuthModule,
    UserModule,
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