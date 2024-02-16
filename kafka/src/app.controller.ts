import { Controller, Get, Post, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(
      private readonly appService: AppService,
    ) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get('emit')
  async emitMessage() {
    const message = { value: 'emit messsage' };
    return await this.appService.emitMessage('eklee', message);
  }

  @Post('send')
  async chatMessage() {
    const message = { value: 'send messsage' };
    return this.appService.sendMessage('eklee', message);
  }
  

  @MessagePattern('eklee')
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response = originalMessage.value;

    //console.log(originalMessage.value);
    console.log(message);
    return response;
  }
}
