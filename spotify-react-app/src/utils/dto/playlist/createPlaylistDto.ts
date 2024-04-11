export default class CreatePlaylistDto {
    name: string;
    file: string;

    constructor(name: string, file: string) {
        this.name = name;
        this.file = file;
    }
}