import { BoardEntity } from "@db/board/board.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => BoardEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: "board_id"})
    board_id: number;

    @Column()
    message: string;
    @Column()
    writer: string;
    @Column()
    createdAt: Date;

    constructor(writer: string, message: string, board_id: number) {
        this.writer = writer;
        this.message = message;
        this.board_id = board_id;
        this.createdAt = new Date();
    }
}