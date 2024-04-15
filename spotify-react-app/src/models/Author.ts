import AlbumLittle from "./AlbumLittle";

export default class Author {

    authorId: string;

    authorName: string;

    imageId: string;

    albums: AlbumLittle[];


    constructor() {
        this.authorId = "";
        this.authorName = "";
        this.imageId = "";
        this.albums = [];
    }

    static init(id: string, name: string, imageId: string, albums: AlbumLittle[]) {

        let newAuthor = new Author();

        newAuthor.authorId = id;
        newAuthor.authorName = name;
        newAuthor.imageId = imageId;
        newAuthor.albums = albums;

        return newAuthor;
    }
}