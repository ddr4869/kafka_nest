import { Controller, Get, Post, Inject, Delete } from '@nestjs/common';
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
const TOPIC=process.env.KAFKA_TOPIC

@Controller()
export class AppController {

  constructor(
      private readonly appService: AppService,
    ) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get('messages') 
  async getMessages() {
    return this.appService.getMessages();
  }

  @Delete('messages')
  async deleteMessages() {
    this.appService.deleteMessages();
    return "success"
  }


  @Get('subscribe')
  async subscribeToMessage() {
    return this.appService.subscribeToMessage();
  }
  
  @EventPattern(TOPIC)
  async handleOrderCreated(data: any) {
    //this.appService.handleOrderCreated(data.value);
  }

  @MessagePattern(TOPIC)
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response = originalMessage.value;
    return response;
  }
}
