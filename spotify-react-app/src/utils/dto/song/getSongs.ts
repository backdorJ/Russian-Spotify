import Song from "../../../models/Song";

export class GetSongs {
    songs: Song[];
    count: number;

    constructor(songs: Song[], count: number) {
        this.songs = songs;
        this.count = count;
    }
}