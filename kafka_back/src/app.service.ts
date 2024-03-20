import { Injectable, Inject, Req } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProducerService } from '@kafka/producer.service';
import { ConsumerService } from '@kafka/consumer.service';
import { CreateOrderRequest, OrderCreateEvent } from './dto';
import { MessageRepository } from './db/message/message.repository';
import { queryMessagesDto } from './db/message/message.dto';
import { MessageEntity } from './db/message/message.entity';
require('dotenv').config();
const TOPIC=process.env.KAFKA_TOPIC

@Injectable()
export class AppService {
  constructor ( 
    private readonly producerService: ProducerService,
    private readonly consumerService:ConsumerService,
    private readonly messageRepository: MessageRepository
  ) {}

  async getHello(): Promise<string> {
    await this.producerService.produce({ 
      topic: TOPIC, 
      messages: [{ 
        key: 'key',
        value: 'Hello Kafka' 
      }] 
    });
    return 'Hello World!';
  }

  async getBoardMessages(board_id: number): Promise<MessageEntity[]> {
    let dto = new queryMessagesDto()
    console.log("getBoardMessages board_id: ", board_id)
    dto.board_id = board_id
    return this.messageRepository.queryBoardMessages(dto);
  }

  async getAllMessages(): Promise<MessageEntity[]> {
    return this.messageRepository.queryAllMessages(new queryMessagesDto());
  }

  async deleteMessages(): Promise<void> {
    return this.messageRepository.clearMessages();
  }

  async createOrder({userId, price}:CreateOrderRequest) {

  }

  async subscribeToMessage() {
    await this.consumerService.consume({topics:[TOPIC],fromBeginning:true})  //{topic: 'eklee', config: { fromBeginning: true }});
  }
}
