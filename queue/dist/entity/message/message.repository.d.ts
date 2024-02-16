import { DataSource, Repository } from "typeorm";
import { MessageEntity } from "./message.entity";
import { MessageDto } from "./message.dto";
export declare class MessageRepository extends Repository<MessageEntity> {
    constructor(dataSource: DataSource);
    createMessage(req: MessageDto): Promise<MessageEntity>;
}
