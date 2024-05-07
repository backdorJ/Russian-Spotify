import Song from "../../../models/Song";

export default class EditSongDto {
    song: Song
    name: string;
    duration: number | undefined;
    category: number | undefined;
    imageFile: File | undefined;

    constructor(song: Song, name: string, duration: number, category: number, imageFile: File) {
        this.song = song;
        this.name = name;
        this.duration = duration;
        this.category = category;
        this.imageFile = imageFile;
    }
}