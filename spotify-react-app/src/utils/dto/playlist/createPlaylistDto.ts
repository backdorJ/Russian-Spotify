export default class CreatePlaylistDto {
    name: string;
    file: File;
    isAlbum: boolean;

    constructor(name: string, file: File, isAlbum: boolean) {
        this.name = name;
        this.file = file;
        this.isAlbum = isAlbum;
    }
}