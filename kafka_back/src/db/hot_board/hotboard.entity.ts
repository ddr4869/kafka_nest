import { BoardEntity } from "@db/board/board.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('hot_board')
export class HotBoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => BoardEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: "board_id"})
    Board: BoardEntity;

    @Column()
    createdAt: Date;

    constructor() {
        this.createdAt = new Date();
    }
}
