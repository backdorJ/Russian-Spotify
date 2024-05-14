export class CreateSubcriptionDto {
    dateStart: Date;
    dateEnd: Date;
    userId: string;

    constructor(dateStart: Date,
                dateEnd: Date,
                userId: string) {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.userId = userId;
    }
}