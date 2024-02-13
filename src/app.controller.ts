import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { BullProducer } from '../bull/producers';

@Controller("bull")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly bullProducer: BullProducer,
    ) {}

  // get jobid from request path, and return this.producerService.getJob(jobId)
  @Get(":jobId")
  getJob(@Param("jobId") id: string): Promise<any> {
    return this.bullProducer.getJob(id);
  }

  @Get("set")
  setJob(): Promise<any> {
    return this.bullProducer.setJob();
  }

  @Get("finish")
  finishJob(): Promise<any> {
    return this.bullProducer.finishJob();
  }

}
