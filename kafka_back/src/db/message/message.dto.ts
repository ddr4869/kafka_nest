import { BoardEntity } from "@db/board/board.entity";

export class createMessageDto {
    writer: string;
    message: string;
    board: BoardEntity;
    constructor(writer: string, message: string, board: BoardEntity) {
        this.writer = writer;
        this.message = message;
        this.board = board;
    }
}

export class queryMessagesDto {
    // have two field, pageSize and pageNumber, and there default value is 20 and 1
    offset: number;
    limit: number;
    createdAt: Date;
    constructor(offset: number = 0, limit: number = 20) {
        this.offset = offset;
        this.limit = limit;
    }
}