import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('friend')
export class FriendEntity {
    @PrimaryColumn()
    username: string;
    @PrimaryColumn()
    friend: string;
    @Column()
    createdAt: Date;
    
    constructor(username: string, friend: string) {
        this.username = username;
        this.friend = friend;
        this.createdAt = new Date();
    }
}