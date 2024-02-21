import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { Kafka, Consumer, ConsumerSubscribeTopics, ConsumerRunConfig } from "kafkajs";
import { EventsGateway } from "src/kafka/gateway";
require('dotenv').config();
const TOPIC=process.env.KAFKA_TOPIC

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
    private readonly kafka: Kafka = new Kafka({
        clientId: TOPIC,
        brokers: ['localhost:9092']
    })
    private readonly consumers: Consumer[] = [];
    constructor(
         private readonly eventsGateway : EventsGateway
    ) {}
    async consume(topics: ConsumerSubscribeTopics) {
        const consumer = this.kafka.consumer({ groupId: TOPIC+'-consumer' });
        await consumer.connect();
        await consumer.subscribe(topics);
        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                this.eventsGateway.server.emit('onMessage', {
                    writer: message.key.toString(),
                    message: message.value.toString()
                });
                console.log({
                    topic: topic,
                    key: message.key.toString(),
                    value: message.value.toString(),
                    headers: message.headers,
                })
            },
        })
        this.consumers.push(consumer);
    }

    // async onApplicationBootstrap() {
    //     await this.consume({ topic: TOPIC, fromBeginning: true });
    // }

    async onApplicationShutdown() {
        this.consumers.forEach(async consumer => {
            await consumer.disconnect();
        });
    }
}