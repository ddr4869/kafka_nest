import { Queue } from 'bull';
import { CreateQueue } from './model/queue_request';
export declare class BullProducer {
    private audioQueue;
    constructor(audioQueue: Queue);
    setJob(data: CreateQueue): Promise<any>;
    finishJob(): Promise<any>;
    getJob(jobId: string): Promise<any>;
}
