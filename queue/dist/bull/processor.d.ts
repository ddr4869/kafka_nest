import { Job } from 'bull';
export declare class BullProcessor {
    private readonly messageRepository;
    private count;
    transcode(job: Job<any>): Promise<any>;
    onActive(job: Job): void;
    onCompleted(job: Job, result: any): any;
    doSomething(data: any, i: number): void;
}
