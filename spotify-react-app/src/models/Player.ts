import {makeAutoObservable} from "mobx";
import Song from "./Song";

// TODO: Мэйби стоит изменить связный списко в Song(song.nextSong, prevSong) на хранение массива Song в плэере
/** DTO для песни которую слушает пользователь*/
export default class Player {
    /**Текущая проигрываемая песня*/
    currentSong: Song | null;

    /** Ссылка текущую на песню */
    currentSongUrl: string;

    constructor() {
        this.currentSongUrl = "";
        this.currentSong = null;
        makeAutoObservable(this);
    }

    static init(currentSong: Song, url: string) {
        let newPlayer = new Player();

        newPlayer.currentSong = currentSong;
        newPlayer.currentSongUrl = url;

        return newPlayer;
    }
}