// DTO для плейлиста/альбома
import Song from "./Song";

export default class Playlist {

    /** ИД плейлиста/альбома */
    playlistId: string;

    /** Название плейлиста/альбома */
    playlistName: string;

    /** ИД картинки */
    imageId: string;

    /** ИД автора */
    authorName: string;

    /** Дата релиза */
    releaseDate: Date;

    /** Альбом ли */
    isAlbum: boolean;

    constructor() {
        this.playlistId = "";
        this.playlistName = "";
        this.imageId = "";
        this.authorName = "";
        this.releaseDate = new Date();
        this.isAlbum = false;
    }

    static init(
        playlistId: string,
        playlistName: string,
        imageId: string,
        authorName: string,
        releaseDate: Date,
        isAlbum: boolean)
    {
        let playlist = new Playlist()

        playlist.playlistId = playlistId;
        playlist.playlistName = playlistName;
        playlist.imageId = imageId;
        playlist.authorName = authorName;
        playlist.releaseDate = releaseDate;
        playlist.isAlbum = isAlbum;

        return playlist;
    }
}