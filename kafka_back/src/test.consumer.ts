import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./kafka/consumer.service";
require('dotenv').config();
const TOPIC=process.env.TOPIC

@Injectable()
export class TestConsumer implements OnModuleInit{
    constructor(private readonly consumerService: ConsumerService) {}
    async onModuleInit() {
        console.log("TestConsumer!")
        await this.consumerService.consume(
            { topics: [TOPIC], fromBeginning: true},
        );
    }
}