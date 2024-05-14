import Song from "./Song";

/** DTO для плейлиста/альбома */
export default class Playlist {

    /** ИД плейлиста/альбома */
    playlistId: string;

    /** Название плейлиста/альбома */
    playlistName: string;

    /** Id картинки */
    imageId: string;

    /** Id автора */
    authorId: string;

    /** Имя автора */
    authorName: string;

    /** Дата релиза */
    releaseDate: Date;

    /** Альбом ли */
    isAlbum: boolean;

    /** Находится ли альбом в избранном */
    isInFavorite: boolean;

    songs: Song[]

    /** ИД песней */
    songsIds: string[] = [];

    constructor() {
        this.playlistId = "";
        this.playlistName = "";
        this.imageId = "";
        this.authorId = "";
        this.authorName = "";
        this.releaseDate = new Date();
        this.isAlbum = false;
        this.isInFavorite = false;
        this.songsIds = [];
        this.songs = []
    }

    static init(
        playlistId: string,
        playlistName: string,
        imageId: string,
        authorId: string,
        authorName: string,
        releaseDate: Date,
        isAlbum: boolean,
        isInFavorite: boolean,
        songsIds: []) {
        let playlist = new Playlist()

        playlist.playlistId = playlistId;
        playlist.playlistName = playlistName;
        playlist.imageId = imageId;
        playlist.authorId = authorId;
        playlist.authorName = authorName;
        playlist.releaseDate = releaseDate;
        playlist.isAlbum = isAlbum;
        playlist.isInFavorite = isInFavorite;
        playlist.songsIds = songsIds;

        return playlist;
    }
}