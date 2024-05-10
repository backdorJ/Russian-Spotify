export default class CreateSongDto {
    name: string;
    duration: number;
    category: number;
    songFile: File;
    imageFile: File;

    constructor(name: string, duration: number, category: number, songFile: File, imageFile: File) {
        this.name = name;
        this.duration = duration;
        this.category = category;
        this.songFile = songFile;
        this.imageFile = imageFile;
    }
}