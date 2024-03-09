import { BoardEntity } from "@db/board/board.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('hot_board')
export class HotBoardEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    board_star: number;
    @Column()
    createdAt: Date;
    @OneToOne(() => BoardEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "board_id"})
    Board: BoardEntity;

    constructor(id:number, board_star: number) {
        this.id = id;
        this.board_star = board_star;
        this.createdAt = new Date();
    }
}