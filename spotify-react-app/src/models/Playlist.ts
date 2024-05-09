import Song from "./Song";
import {PlaylistType} from "../pages/PlaylistPage/enums/playlistTypes";

/** DTO для плейлиста/альбома */
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

    /** Находится ли альбом в избранном */
    isInFavorite: boolean;

    /** Песни плейлиста */
    songs: Song[];

    constructor() {
        this.playlistId = "";
        this.playlistName = "";
        this.imageId = "";
        this.authorName = "";
        this.releaseDate = new Date();
        this.isAlbum = false;
        this.isInFavorite = false;
        this.songs = []
    }

    static init(
        playlistId: string,
        playlistName: string,
        imageId: string,
        authorName: string,
        releaseDate: Date,
        isAlbum: boolean,
        isInFavorite: boolean) {
        let playlist = new Playlist()

        playlist.playlistId = playlistId;
        playlist.playlistName = playlistName;
        playlist.imageId = imageId;
        playlist.authorName = authorName;
        playlist.releaseDate = releaseDate;
        playlist.isAlbum = isAlbum;
        playlist.isInFavorite = isInFavorite;

        return playlist;
    }
}