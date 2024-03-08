export class CreateUserDto {
    username: string;
    password: string;
    role: number;
    constructor(username: string, password: string, role: number) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

export class SigninDto {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class FriendDto {
    username: string;
    friend: string;

    constructor(username: string, friend: string) {
        this.username = username;
        this.friend = friend;
    }
}