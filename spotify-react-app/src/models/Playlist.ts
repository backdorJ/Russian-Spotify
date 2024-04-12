// DTO для плейлиста/альбома
import Song from "./Song";

export default class Playlist {

    // ИД плейлиста/альбома
    playlistId: string;

    // Название плейлиста/альбома
    playlistName: string;

    // ИД картинки
    imageId: string;

    // ИД автора
    authorName: string;

    // Дата релиза
    releaseDate: Date;

    // Песни
    songs: Array<Song>;

    // Альбом ли
    isAlbum: boolean;

    // ИД песен в виде Guid
    songsIds: Array<string>;

    constructor() {
        this.playlistId = "";
        this.playlistName = "";
        this.imageId = "";
        this.authorName = "";
        this.releaseDate = new Date();
        this.songs = new Array<Song>();
        this.isAlbum = false;
        this.songsIds = new Array<string>();
    }

    static init(
        playlistId: string,
        playlistName: string,
        imageId: string,
        authorName: string,
        releaseDate: Date,
        songs: Array<Song>,
        isAlbum: boolean,
        songsIds: Array<string> | null)
    {
        let playlist = new Playlist()

        playlist.playlistId = playlistId;
        playlist.playlistName = playlistName;
        playlist.imageId = imageId;
        playlist.authorName = authorName;
        playlist.releaseDate = releaseDate;
        playlist.songs = songs;
        playlist.isAlbum = isAlbum;
        playlist.songsIds = songsIds === null
            ? new Array<string>()
            : songsIds;

        return playlist;
    }
}