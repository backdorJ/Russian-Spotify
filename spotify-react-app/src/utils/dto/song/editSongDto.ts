export default class EditSongDto {
    name: string;
    duration: number | undefined;
    category: number | undefined;
    songFile: File | undefined;
    imageFile: File | undefined;

    constructor(name: string, duration: number, category: number, songFile: File, imageFile: File) {
        this.name = name;
        this.duration = duration;
        this.category = category;
        this.songFile = songFile;
        this.imageFile = imageFile;
    }
}