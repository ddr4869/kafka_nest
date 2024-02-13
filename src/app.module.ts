import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import * as config from './config/config';
import { BullProducer } from 'bull/producers';
import { BullProcessor } from 'bull/processor';
import { join } from 'path';
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
      processors: [join(__dirname, '..','bull', 'processor.js')],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, BullProducer, BullProcessor],
})
export class AppModule {}
