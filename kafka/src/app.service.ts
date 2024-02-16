import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class AppService {
  constructor ( 
    @Inject('KAFKA') 
    private readonly kafkaProducer: ClientKafka,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async emitMessage(topic: string, message: any): Promise<Observable<any>> {
    return await this.kafkaProducer.emit(topic, message);
  }


  async sendMessage(topic: string, message: any): Promise<Observable<any>> {
    return await this.kafkaProducer.send(topic, message);
  }

  async subscribeToMessage() {
    console.log("subscribeToMessage")
    this.kafkaProducer.subscribeToResponseOf('eklee');
    await this.kafkaProducer.connect();
  }
}
