import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection,
  OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger, UseInterceptors, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageBody } from '@nestjs/websockets';
import { MessageRepository } from 'src/db/message/message.repository';
import { MessageEntity } from 'src/db/message/message.entity';
import { createMessageDto } from 'src/db/message/message.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { ConsumerService } from 'src/kafka/consumer.service';
const TOPIC=process.env.KAFKA_TOPIC

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly producerService: ProducerService,
    //private readonly consumerService: ConsumerService
    ) {}

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() data: any) {
    this.producerService.produce({
      topic: TOPIC,
      messages: [{ 
          key: data.writer,
          value: data.message
        }]
    });
    // this.server.emit('onMessage', {
    //   writer: data.writer,
    //   message: data.message
    // });
    let entity = this.messageRepository.createMessage(new createMessageDto(data.writer, data.message));
    console.log("entity!: ", entity);
    return data;
  }

  afterInit(server: Server) {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
    this.server.emit('onComing', {
      writer: client.id.substring(0, 8),
      message: "방에 입장하셨습니다."
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
  }
}