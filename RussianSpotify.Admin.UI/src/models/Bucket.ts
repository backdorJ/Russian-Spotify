import Song from "./Song";

export default class Bucket {
    bucketId: string;
    userId: string;
    songs: Song[] = [];

    constructor(bucketId: string,
                userId: string,
                songs: Song[]) {
        this.bucketId = bucketId;
        this.userId = userId;
        this.songs = songs;
    }
}