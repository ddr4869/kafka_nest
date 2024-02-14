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
    created_at: Date;

    constructor(message: string, writer: string, created_at: Date) {
        this.message = message;
        this.writer = writer;
        this.created_at = created_at;
    }
}