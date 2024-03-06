export class createUserDto {
    username: string;
    password: string;
    role: number;
    constructor(username: string, password: string, role: number) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

export class queryMessagesDto {
    // have two field, pageSize and pageNumber, and there default value is 20 and 1
    offset: number;
    limit: number;
    createdAt: Date;
    constructor(offset: number = 0, limit: number = 20) {
        this.offset = offset;
        this.limit = limit;
    }
}