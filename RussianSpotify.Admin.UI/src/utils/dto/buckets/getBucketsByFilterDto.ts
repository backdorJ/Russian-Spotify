export default class GetBucketsByFilterDto {
    id: string | null = null;
    userId: string | null = null;

    constructor(id: string | null = null,
                userId: string | null = null) {
        this.id = id;
        this.userId = userId;
    }
}