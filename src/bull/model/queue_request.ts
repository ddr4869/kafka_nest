// create queue data class, it should include name, data, created_at and return this.audioQueue.add(name, data, { delay: 1000, timestamp: created_at })
export class CreateQueue {
    public name: string;
    public data: string;
    public created_at: Date;

    constructor(name, data, created_at) {
        this.name = name;
        this.data = data;
        this.created_at = created_at;
    }    
}

