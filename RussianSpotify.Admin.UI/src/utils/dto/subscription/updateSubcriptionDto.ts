export class UpdateSubcriptionDto {
    id: string;
    dateStart: Date | null = null;
    dateEnd: Date | null = null;
    userId: string | null = null;

    constructor(id: string,
                dateStart: Date | null = null,
                dateEnd: Date | null = null,
                userId: string | null = null) {
        this.id = id;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.userId = userId;
    }
}