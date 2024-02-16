import { AppService } from './app.service';
import { BullProducer } from './bull/producers';
import { MessageRepository } from './entity/message/message.repository';
import { MessageEntity } from './entity/message/message.entity';
export declare class AppController {
    private readonly appService;
    private readonly messageRepository;
    private readonly bullProducer;
    constructor(appService: AppService, messageRepository: MessageRepository, bullProducer: BullProducer);
    getJob(id: string): Promise<any>;
    setJob(req: any): Promise<any>;
    getHello(foo: string): string;
    getHello2(req: any): string;
    createMessage(message: string, writer: string): Promise<MessageEntity>;
}
