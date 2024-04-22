import Playlist from "../../../models/Playlist";

export default class EditPlaylistDto {
    name: string;
    file: File;
    songsIds: Array<string>
    playlist: Playlist

    constructor(name: string, file: File, songsIds: Array<string>, playlist: Playlist) {
        this.name = name;
        this.file = file;
        this.songsIds = songsIds;
        this.playlist = playlist;
    }
}