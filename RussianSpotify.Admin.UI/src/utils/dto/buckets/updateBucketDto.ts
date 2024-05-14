export default class UpdateBucketDto {
    id: string;
    addSongsIds: string[] | null = null;
    removeSongsIds: string[] | null = null;

    constructor(id: string,
                addSongsIds: string[] | null = null,
                removeSongsIds: string[] | null = null) {
        this.id = id;
        this.addSongsIds = addSongsIds;
        this.removeSongsIds = removeSongsIds;
    }
}