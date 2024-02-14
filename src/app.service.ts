import { Injectable } from '@nestjs/common';
import { BullProducer } from './bull/producers';
@Injectable()
export class AppService {
  constructor(
    //private readonly bullProducer: BullProducer,
    //private readonly messageService: MessageService,
    ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // createMessage(req: any): string {
  //   this.messageService.createMessage(req);
  //   return "success";
  // }
}
