import {makeAutoObservable} from "mobx";
import Song from "./Song";
import Playlist from "./Playlist";

// TODO: Мэйби стоит изменить связный список в SongCard(song.nextSong, prevSong) на хранение массива SongCard в плэере
/** DTO для песни которую слушает пользователь*/
export default class Player {
    /**Текущая проигрываемая песня*/
    currentSong: Song | null;

    /** Ссылка текущую на песню */
    currentSongUrl: string;

    /** Текущий плейлист */
    currentPlaylist: Playlist | null

    constructor() {
        this.currentSongUrl = "";
        this.currentSong = null;
        this.currentPlaylist = null;
        makeAutoObservable(this);
    }

    static init(currentSong: Song, url: string, currentPlaylist: Playlist | null) {
        let newPlayer = new Player();

        newPlayer.currentSong = currentSong;
        newPlayer.currentSongUrl = url;
        newPlayer.currentPlaylist = currentPlaylist;

        return newPlayer;
    }
}