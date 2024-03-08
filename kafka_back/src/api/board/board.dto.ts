export class CreateBoardDto {
    name: string;
    board_admin: string;
    board_password: string;
    
    constructor(name: string, board_admin: string, board_password: string) {
        this.name = name;
        this.board_admin = board_admin;
        this.board_password = board_password;
    }
}

export class DeleteBoardDto {
    id: number;
    username: string;
    board_password: string;
    
    constructor(id:number, username:string, board_password: string) {
        this.id = id;
        this.username = username;
        this.board_password = board_password;
    }
}
