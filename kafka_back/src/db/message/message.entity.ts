import { BoardEntity } from "@db/board/board.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(() => BoardEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: "board_id"})
    board: BoardEntity;

    @Column()
    message: string;
    @Column()
    writer: string;
    @Column()
    createdAt: Date;

    constructor(writer: string, message: string, board: BoardEntity) {
        this.writer = writer;
        this.message = message;
        this.board = board;
        this.createdAt = new Date();
    }
}