import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    role: number;
    @Column()
    createdAt: Date;

    constructor(username: string, password: string, role: number) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.createdAt = new Date();
    }
}