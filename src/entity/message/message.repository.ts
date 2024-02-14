import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { MessageEntity } from "./message.entity";
import { MessageDto } from "./message.dto";


@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(dataSource: DataSource) {
    super(MessageEntity, dataSource.createEntityManager());
  }

  async createMessage(req: MessageDto): Promise<MessageEntity> {
    const entity:MessageEntity = new MessageEntity(req.message, req.writer, new Date());
    return super.create(entity);
  }
}