import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProducerService } from './kafka/producer.service';
import { ConsumerService } from './kafka/consumer.service';
import { CreateOrderRequest, OrderCreateEvent } from './dto';
require('dotenv').config();
const TOPIC=process.env.TOPIC

@Injectable()
export class AppService {
  constructor ( 
    private readonly producerService: ProducerService,
    private readonly consumerService:ConsumerService
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

  async createOrder({userId, price}:CreateOrderRequest) {

  }

  async subscribeToMessage() {
    console.log("subscribeToMessage")
    await this.consumerService.consume({topics:[TOPIC],fromBeginning:true})  //{topic: 'eklee', config: { fromBeginning: true }});
  }
}
