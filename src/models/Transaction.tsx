export class Transaction {
    id: number;
    date: Date;
    text: string;
    amount: number;
    totalAmount: number;

    constructor() {
        this.id = 0;
        this.date = new Date();
        this.text = '';
        this.amount = 0;
        this.totalAmount = 0;
    }
}