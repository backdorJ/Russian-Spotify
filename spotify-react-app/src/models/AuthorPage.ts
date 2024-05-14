import Song from "./Song";
import Playlist from "./Playlist";

export default class Author {
    /** Имя автора*/
    name: string;

    /** Ссылка на картинку автора */
    imageLink: string;

    /** Песни автора */
    authorMusic: Song[];

    /** Плейлисты автора */
    authorPlaylists: Playlist[];

    constructor() {
        this.name = "";
        this.imageLink = "";
        this.authorMusic = [];
        this.authorPlaylists = [];
    }

    static init(name: string,
                imageLink: string,
                authorMusic: Song[],
                authorPlaylists: Playlist[]) {

        let newAuthor = new Author();
        newAuthor.name = name;
        newAuthor.imageLink = imageLink;
        newAuthor.authorMusic = authorMusic;
        newAuthor.authorPlaylists = authorPlaylists;

        return newAuthor;
    }
}