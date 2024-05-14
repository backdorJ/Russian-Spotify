export default class Playlist {
    id: string;
    name: string;
    authorId: string;
    authorName: string;
    imageId: string;
    isAlbum: boolean;
    releaseDate: string;

    constructor(id: string,
                name: string,
                authorId: string,
                authorName: string,
                imageId: string,
                isAlbum: boolean,
                releaseDate: string) {
        this.id = id;
        this.name = name;
        this.authorId = authorId;
        this.authorName = authorName;
        this.imageId = imageId;
        this.isAlbum = isAlbum;
        this.releaseDate = releaseDate;
    }
}