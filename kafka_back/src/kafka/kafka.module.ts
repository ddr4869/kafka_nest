import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { EventsGateway } from 'src/kafka/gateway';
import { MessageRepository } from 'src/db/message/message.repository';
@Module({
    imports : [],
    providers: [ProducerService, ConsumerService, MessageRepository, EventsGateway],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}