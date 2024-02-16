import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import * as config from './config/config';
import { BullProducer } from 'src/bull/producers';
import { BullProcessor } from 'src/bull/processor';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModule } from './entity/entity.module';
import { MessageRepository } from './entity/message/message.repository';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: config.REDISHOST,
        port: config.REDISPORT,
        password: config.REDISPWD,
      },
    }),
    BullModule.registerQueue({
      name: 'audio',
      processors: [join(__dirname, 'bull', 'processor.js')],
    }),
    EntityModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageRepository, BullProducer, BullProcessor],
})
export class AppModule {}
