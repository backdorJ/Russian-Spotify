export class ResponseWithMessage {
    status: number;
    message: string;
    value: any;

    constructor(status: number, message: string, value: any = undefined) {
        this.status = status;
        this.message = message;
        this.value = value;
    }
}