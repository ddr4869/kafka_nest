import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { GatewayModule } from './gateway/gateway.module';
import { Db } from 'typeorm';
import { DbModule } from './db/db.module';
import { MessageRepository } from './db/message/message.repository';
import { EventsGateway } from './gateway/gateway';
import { ProducerService } from './kafka/producer.service';
import { ConsumerService } from './kafka/consumer.service';

@Module({
  imports: [
    KafkaModule,
    //GatewayModule,
    DbModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway, MessageRepository],
})
export class AppModule {}