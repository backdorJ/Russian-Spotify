export default class CreatePlaylistDto {
    name: string;
    imageId: string | null = null;
    authorId: string;
    isAlbum: boolean

    constructor(name: string,
                imageId: string | null = null,
                authorId: string,
                isAlbum: boolean) {
        this.name = name;
        this.imageId = imageId;
        this.authorId = authorId;
        this.isAlbum = isAlbum;
    }
}