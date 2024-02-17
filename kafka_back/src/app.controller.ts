import { Controller, Get, Post, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
  EventPattern,
} from '@nestjs/microservices';
require('dotenv').config();
const TOPIC=process.env.TOPIC

@Controller()
export class AppController {

  constructor(
      private readonly appService: AppService,
    ) {}

  @Get()
  async getHello() {
    console.log('getHello');
    return this.appService.getHello();
  }

  @Post()
  createOrder(): void 
  {
    //return this.appService.createOrder();
  }

  @Get('subscribe')
  async subscribeToMessage() {
    console.log('subscribeToMessage');
    return this.appService.subscribeToMessage();
  }
  
  @EventPattern(TOPIC)
  async handleOrderCreated(data: any) {
    console.log('EventPattern: ', data.value);
    //this.appService.handleOrderCreated(data.value);
  }

  @MessagePattern(TOPIC)
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('MessagePattern: ', message);
    const originalMessage = context.getMessage();
    const response = originalMessage.value;
    console.log('response: ', response);
    //console.log(originalMessage.value);
    return response;
  }
}
