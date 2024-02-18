import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    message: string;
    @Column()
    writer: string;
    @Column()
    createdAt: Date;

    constructor(writer: string, message: string) {
        this.writer = writer;
        this.message = message;
        this.createdAt = new Date();
    }
}