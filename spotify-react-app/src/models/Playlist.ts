import Song from "./Song";
import {PlaylistType} from "../pages/PlaylistPage/enums/playlistTypes";
import {getSongsByFilter} from "../http/songApi";
import {songFilters} from "../http/filters/songFilters";
import {getUserId} from "../functions/getUserId";

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
    
    /** Тип плейлиста */
    playlistType: PlaylistType

    constructor() {
        this.playlistId = "";
        this.playlistName = "";
        this.imageId = "";
        this.authorName = "";
        this.releaseDate = new Date();
        this.isAlbum = false;
        this.isInFavorite = false;
        this.songs = []
        this.playlistType = PlaylistType.Playlist
    }

    static init(
        playlistId: string,
        playlistName: string,
        imageId: string,
        authorName: string,
        releaseDate: Date,
        isAlbum: boolean,
        isInFavorite: boolean,
        playlistType: PlaylistType) {
        let playlist = new Playlist()

        playlist.playlistId = playlistId;
        playlist.playlistName = playlistName;
        playlist.imageId = imageId;
        playlist.authorName = authorName;
        playlist.releaseDate = releaseDate;
        playlist.isAlbum = isAlbum;
        playlist.isInFavorite = isInFavorite;
        playlist.playlistType = playlistType;

        return playlist;
    }

    setPlaylistType(playlistType: PlaylistType) {
        this.playlistType = playlistType;
    }
    
    async getSongs(page: number) {
        let result: Song[] = []
        if (this.playlistType === PlaylistType.Playlist)
            result = await getSongsByFilter(songFilters.songsInPlaylistFilter, this.playlistId, page, 5);
        else if (this.playlistType === PlaylistType.FavoriteSongs)
            result = await getSongsByFilter(songFilters.favoriteSongsFilter, getUserId(), page, 5);
        else if (this.playlistType === PlaylistType.ArtistSongs)
            result = await getSongsByFilter(songFilters.authorSongsFilter, this.authorName, page, 5);
        console.log(result);
        this.songs.push(...result);
        return this.songs
    }

    async getMoreSongs(page: number) {
        await this.getSongs(page); 
        return this.songs;
    }
}