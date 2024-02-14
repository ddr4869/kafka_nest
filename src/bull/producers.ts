import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { CreateQueue } from './model/queue_request';

@Injectable()
export class BullProducer {
  constructor(
    @InjectQueue('audio') 
    private audioQueue: Queue,
    ) {}

    async setJob(data: CreateQueue): Promise<any> {
      console.log("data: ",data.data)
      console.log("name: ",data.name)
      try {
        const job = await this.audioQueue.add("transcode",{
        data: data,
        });
        if (job?.id === undefined) {
          throw new Error('Save event data job ID not available');
        }
        console.log('Job DATA:', job.data)
        return {job_id:job.id, job_data: job.data}
      } catch (error) {
        console.log(error)
      }
    }

    async finishJob(): Promise<any> {
      try {
        const job = await this.audioQueue.add("transcode",{
          foo: 'bar',
          });
          if (job?.id === undefined) {
            throw new Error('Save event data job ID not available');
          }
        if (job?.id === undefined) {
          throw new Error('Save event data job ID not available');
        }
        const result = await job.finished();
        console.log('Job DATA:', result)
        return {job_data: result}
      } catch (error) {
        console.log(error)
      }
    }

    async getJob(jobId: string): Promise<any> {
      console.log('Job ID:', jobId)
      try {
        const job = await this.audioQueue.getJob(jobId);
        if (job?.id === undefined) {
          throw new Error('Save event data job ID not available');
        }
        console.log('Job DATA:', job.data)
        return {job_data: job.data}
      } catch (error) {
        console.log(error)
      }
    }
}