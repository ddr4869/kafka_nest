import { Processor, Process, OnQueueActive, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Scope } from '@nestjs/common';

// @Processor({
//   name:'audio', scope: Scope.REQUEST})
@Processor('audio')
export class BullProcessor {
  private count=0;

  @Process("transcode")
  async transcode(job: Job<any>): Promise<any> {
    console.log("transcode start...")
    this.count++;
    const resObj = JSON.parse(`{ "jobId": "${job.id}", "count": ${this.count} }`);
    console.log(resObj)
    return {queue:resObj, data: job.data};
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    return job.returnvalue();
    console.log(
      `Completed job ${job.id} of type ${job.name} with result ${result}...`,
    );
  } 

  doSomething(data: any, i: number) {
    console.log(i)
    // do something with data
  }
}