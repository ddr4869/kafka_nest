import { Injectable } from "@nestjs/common";
import { MessageEntity } from "./message.entity";
import { createMessageDto } from "./message.dto";
import { DataSource, Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { queryMessagesDto } from "./message.dto";

@Injectable()
export class MessageRepository extends Repository<MessageEntity>{

    constructor(dataSource: DataSource) {
        super(MessageEntity, dataSource.createEntityManager());
    }
    
    async createMessage(dto: createMessageDto): Promise<any> {
        const entity: MessageEntity = super.create(new MessageEntity(dto.writer, dto.message, dto.board_id));
        await super.save(entity);
        console.log("createMessage success!")
        return entity;
    }

    async queryBoardMessages(dto: queryMessagesDto): Promise<any> {
        console.log("dto.board_id: ", dto.board_id)
        // query messages with pagination, shoul query latest messages
        const options: FindManyOptions<MessageEntity> = {
            where: { board_id: dto.board_id },
            order: { createdAt: "DESC" },
            take: 50,
        }
        const messages: MessageEntity[] = await super.find(
            options
        );
        console.log("messages: ", messages)
        return messages;
    }

    async queryAllMessages(dto: queryMessagesDto): Promise<any> {
        // query messages with pagination, shoul query latest messages
        const options: FindManyOptions<MessageEntity> = {
            order: { createdAt: "DESC" },
            take: 50,
        }
        const messages: MessageEntity[] = await super.find(options);
        return messages;
    }

    async clearMessages(): Promise<void> {
        return super.clear();
    }
}


