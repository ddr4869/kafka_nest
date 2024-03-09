import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    board_name: string;

    @IsNotEmpty()
    @IsString()
    board_admin: string;

    @IsNotEmpty()
    @IsString()
    board_password: string;
    
    constructor(board_name: string, board_admin: string, board_password: string) {
        this.board_name = board_name;
        this.board_admin = board_admin;
        this.board_password = board_password;
    }
}

export class CreateRecommendBoardDto {
    @IsNotEmpty()
    @IsNumber()
    board_id: number;

    @IsNotEmpty()
    @IsNumber()
    board_star: number;
    
    constructor(board_id: number, board_star: number) {
        this.board_id = board_id;
        this.board_star = board_star;
    }
}

export class RecommendBoardDto {
    @IsNotEmpty()
    @IsNumber()
    board_id: number;

    constructor(board_id:number) {
        this.board_id = board_id;
    }
}

export class BoardResultDto {
    @IsNotEmpty()
    @IsNumber()
    board_id: number;

    @IsNotEmpty()
    @IsString()
    board_name: string;

    @IsNotEmpty()
    @IsString()
    board_admin: string;

    @IsNotEmpty()
    @IsNumber()
    board_star: number;

    constructor(board_id:number, board_name: string, board_admin: string, board_star: number) {
        this.board_id = board_id;
        this.board_name = board_name;
        this.board_admin = board_admin;
        this.board_star = board_star;
    }
}


export class DeleteBoardDto {
    @IsNotEmpty()
    @IsNumber()
    board_id: number;

    @IsNotEmpty()
    @IsString()
    board_admin: string;

    @IsNotEmpty()
    @IsString()
    board_password: string;
    
    constructor(board_id:number, board_admin:string, board_password: string) {
        this.board_id = board_id;
        this.board_admin = board_admin;
        this.board_password = board_password;
    }
}
