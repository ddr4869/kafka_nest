import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { EventsGateway } from '@kafka/gateway';
import { MessageRepository } from '@db/message/message.repository';
import { BoardRepository } from '@db/board/board.repository';
@Module({
    imports : [],
    providers: [ProducerService, ConsumerService, MessageRepository, BoardRepository, EventsGateway],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}