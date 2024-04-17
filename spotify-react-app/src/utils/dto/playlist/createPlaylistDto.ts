export default class CreatePlaylistDto {
    name: string;
    file: File;

    constructor(name: string, file: File) {
        this.name = name;
        this.file = file;
    }
}