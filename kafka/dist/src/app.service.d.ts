import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class AppService {
    private readonly kafkaProducer;
    constructor(kafkaProducer: ClientKafka);
    getHello(): Promise<string>;
    emitMessage(topic: string, message: any): Promise<Observable<any>>;
    sendMessage(topic: string, message: any): Promise<Observable<any>>;
    subscribeToMessage(): Promise<void>;
}
