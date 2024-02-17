export class CreateOrderRequest{
    userId: string;
    price: number;
}

export class OrderCreateEvent{
    constructor(
        public readonly orderId: string,
        public readonly userId: string,
        public readonly price: number
    ) {}

    toString(): string {
        return `OrderCreateEvent: {orderId: ${this.orderId}, userId: ${this.userId}, price: ${this.price}}`;
    }
}