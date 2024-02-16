import { Controller, Get, Param, Post, Query, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { BullProducer } from './bull/producers';
import { CreateQueue } from './bull/model/queue_request';
import { MessageRepository } from './entity/message/message.repository';
import { MessageEntity } from './entity/message/message.entity';
import { MessageDto } from './entity/message/message.dto';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageRepository: MessageRepository,
    private readonly bullProducer: BullProducer,
    ) {}

  // get jobid from request path, and return this.producerService.getJob(jobId)
  @Get("/get/:jobId")
  getJob(@Param("jobId") id: string): Promise<any> {
    console.log("here")
    return this.bullProducer.getJob(id);
  }

  @Get("set")
  setJob(@Query() req: any): Promise<any> {
    return this.bullProducer.setJob(new CreateQueue(req.name, req.data, new Date()));
  }

  // @Get("finish")
  // finishJob(): Promise<any> {
  //   return this.bullProducer.finishJob();
  // }

  // @Post("message")
  // createMessage(@Body('name') name, @Body('data') data): Promise<any> {
  //   console.log("message start!")
  //   console.log(name)
  //   var request = new CreateQueue(name, data, new Date())
  //   //this.appService.createMessage(request);
  //   return this.bullProducer.setJob(request);
  //   //return 
  // }

  @Get("hello")
  getHello(@Query("foo") foo:string): string {
    console.log(foo); // 출력: 1
    return this.appService.getHello();
  }
  @Get("hello2")
  getHello2(@Req() req): string {
    console.log(req.query.foo); // 출력: 1
    return this.appService.getHello();
  }

  @Post("hello3")
  async createMessage(@Body("message") message:string, @Body("writer") writer:string): Promise<MessageEntity> {
    return this.messageRepository.createMessage(new MessageDto(message, writer));
  }
}
