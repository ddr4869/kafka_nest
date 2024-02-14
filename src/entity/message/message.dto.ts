import { IsNotEmpty } from "class-validator";
export class MessageDto {
    @IsNotEmpty()
    message: string;
    @IsNotEmpty()
    writer: string;

    constructor(message: string, writer: string) {
        this.message = message;
        this.writer = writer;
    }
}