/// <reference types="node" />
import { AppService } from './app.service';
import { KafkaContext } from '@nestjs/microservices';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<string>;
    emitMessage(): Promise<import("rxjs").Observable<any>>;
    chatMessage(): Promise<import("rxjs").Observable<any>>;
    readMessage(message: any, context: KafkaContext): Buffer;
}
