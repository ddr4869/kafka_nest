import { HotBoardEntity } from "@db/hot_board/hotboard.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('board')
export class BoardEntity {
    @PrimaryGeneratedColumn()
    board_id: number;
    @Column()
    board_name: string;
    @Column()
    board_admin: string;
    @Column() 
    board_password: string; // TODO: hash password
    @Column()
    board_star: number;
    @Column()
    createdAt: Date;
    @OneToOne(() => HotBoardEntity)
    @JoinColumn()
    hotBoard: HotBoardEntity;
    
    constructor(board_name: string, board_admin:string, board_password: string) {
        this.board_name = board_name;
        this.board_admin = board_admin;
        this.board_password = board_password;
        this.board_star = 0;
        this.createdAt = new Date();
    }
}