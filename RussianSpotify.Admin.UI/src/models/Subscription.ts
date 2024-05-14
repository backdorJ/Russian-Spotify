export default class Subscription {
    id: string;
    dateStart: Date;
    dateEnd: Date;
    userId: string;

    constructor(id: string,
                dateStart: Date,
                dateEnd: Date,
                userId: string) {
        this.id = id;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.userId = userId;
    }
}