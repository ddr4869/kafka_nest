import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageRepository } from './db/message/message.repository';
import { LoggerMiddleware } from './common/logger.middleware';
import { AuthModule } from '@auth';
import { UserModule } from '@user/user.module';
import { HttpExceptionFilter } from "@common/exception/http-exception.filter";
import { ProducerService, ConsumerService, KafkaModule } from '@kafka';
import { DbModule } from '@db/db.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@common/interceptor/response.interceptor';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    ApiModule,
    UserModule,
    KafkaModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService, 
    MessageRepository,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude(
      { path : '/', method: RequestMethod.GET }
    ).forRoutes('*');
  }
}