import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('board')
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    board_admin: string;
    @Column() 
    board_password: string; // TODO: hash password
    @Column()
    star: number;
    @Column()
    createdAt: Date;
    
    constructor(name: string, board_admin:string, board_password: string) {
        this.name = name;
        this.board_admin = board_admin;
        this.board_password = board_password;
        this.star = 0;
        this.createdAt = new Date();
    }
}