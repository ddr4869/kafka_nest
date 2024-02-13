import { Injectable } from '@nestjs/common';
import { ProducerService } from '../bull/producers';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  setJob(): string {
    //ProducerService
    return 'Hello World!';
  }
}
