import { Injectable } from "@nestjs/common";
import { Kafka, Consumer, ConsumerSubscribeTopics, ConsumerRunConfig } from "kafkajs";
require('dotenv').config();
const TOPIC=process.env.TOPIC

@Injectable()
export class ConsumerService {
    private readonly kafka: Kafka = new Kafka({
        clientId: TOPIC,
        brokers: ['localhost:9092']
    })
    private readonly consumers: Consumer[] = [];
    
    async consume(topics: ConsumerSubscribeTopics) {
        console.log("topic: ", topics)
        console.log("Consumers length:", this.consumers.length)
        const consumer = this.kafka.consumer({ groupId: TOPIC+'-consumer' });
        await consumer.connect();
        await consumer.subscribe(topics);
        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
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

    async onApplicationShutdown() {
        this.consumers.forEach(async consumer => {
            await consumer.disconnect();
        });
    }
}