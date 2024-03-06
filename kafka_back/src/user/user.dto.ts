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
}