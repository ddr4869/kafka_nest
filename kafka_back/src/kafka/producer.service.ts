import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
require('dotenv').config();
const TOPIC=process.env.KAFKA_TOPIC

@Injectable()
export class ProducerService implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly kafka: Kafka = new Kafka({
        clientId: TOPIC,
        brokers: ['localhost:9092']
    })
    private readonly producer: Producer = this.kafka.producer();
    
    async produce(record: ProducerRecord) {
        await this.producer.send(record);
    }

    async onApplicationBootstrap() {
        await this.producer.connect();
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }

}