import Playlist from "../../../models/Playlist";

export class GetPlaylists {
    playlists: Playlist[];
    count: number;

    constructor(playlists: Playlist[], count: number) {
        this.playlists = playlists;
        this.count = count;
    }
}