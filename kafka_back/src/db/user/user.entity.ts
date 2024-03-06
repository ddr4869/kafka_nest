import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('user')
@Unique(['username'])
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column() 
    password: string; // TODO: hash password
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