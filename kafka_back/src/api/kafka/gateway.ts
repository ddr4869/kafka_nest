import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection,
  OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger, UseInterceptors, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageBody } from '@nestjs/websockets';
import { MessageRepository } from '@db/message/message.repository';
import { createMessageDto } from '@db/message/message.dto';
import { ProducerService } from '@kafka/producer.service';
import { ConsumerService } from '@kafka/consumer.service';
import { BoardRepository } from '@db/board/board.repository';
const TOPIC=process.env.KAFKA_TOPIC

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly boardRepository: BoardRepository,
    private readonly producerService: ProducerService,
    //private readonly consumerService: ConsumerService
    ) {}

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() data: any) {
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

    let boardEntity = await this.boardRepository.getBoardByName(TOPIC)
    let entity = this.messageRepository.createMessage(new createMessageDto(data.writer, data.message, boardEntity));
    console.log("entity!: ", entity);
    return data;
  }

  @SubscribeMessage('connect')
  async onConnect(@MessageBody() data: any) {
    this.producerService.produce({
      topic: TOPIC,
      messages: [{ 
          key: data.writer,
          value: data.message
        }]
    });
    let boardEntity = await this.boardRepository.getBoardByName(TOPIC)
    let entity = this.messageRepository.createMessage(new createMessageDto(data.writer, data.message, boardEntity));
    console.log("entity!: ", entity);
    return data;
  }

  afterInit(server: Server) {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
    console.log("args: ", args)
    this.server.emit('onComing', {
      writer: client.id.substring(0, 8), 
      message: "방에 입장하셨습니다."
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
  }
}