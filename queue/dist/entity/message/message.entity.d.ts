export declare class MessageEntity {
    id: number;
    message: string;
    writer: string;
    created_at: Date;
    constructor(message: string, writer: string, created_at: Date);
}
