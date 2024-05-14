export default class GetSubcriptionsByFilterDto {
    pageNumber: number | null = null;
    pageSize: number | null = null;
    userId: string | null = null;
    id: string | null = null;
    startedAfter: Date | null = null;
    finishedAfter: Date | null = null;
    finishedBefore: Date | null = null;
    startedBefore: Date | null = null;
    userRole: string | null = null;
    alreadyFinished: boolean | null = null;

    constructor(pageNumber: number | null = null,
                pageSize: number | null = null,
                userId: string | null = null,
                id: string | null = null,
                startedAfter: Date | null = null,
                finishedAfter: Date | null = null,
                finishedBefore: Date | null = null,
                startedBefore: Date | null = null,
                userRole: string | null = null,
                alreadyFinished: boolean | null = null) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.userId = userId;
        this.id = id;
        this.startedAfter = startedAfter;
        this.finishedAfter = finishedAfter;
        this.finishedBefore = finishedBefore;
        this.startedBefore = startedBefore;
        this.userRole = userRole;
        this.alreadyFinished = alreadyFinished;
    }
}