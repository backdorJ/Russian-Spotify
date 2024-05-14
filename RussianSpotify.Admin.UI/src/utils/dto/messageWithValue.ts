export class MessageWithValue {
    message: string;
    value: any;

    constructor(message: string, value: any = undefined) {
        this.message = message;
        this.value = value;
    }
}