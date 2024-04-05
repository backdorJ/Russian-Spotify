import * as stream from "stream";
import {makeAutoObservable} from "mobx";
import Song from "./Song";

/** DTO для песни которую слушает пользователь*/
export default class Player {
    /**Текущая проигрываемая песня*/
    currentSong: Song | null;

    /**Следущая песня*/
    nextSong: Song | null;

    /** Ссылка текущую на песню */
    currentSongUrl: string;


    constructor() {
        this.currentSongUrl = "";
        this.nextSong = null;
        this.currentSong = null;
        makeAutoObservable(this);
    }

    static init(currentSong: Song, nextSong: Song | null, url: string) {
        let newPlayer = new Player();

        newPlayer.currentSong = currentSong;
        newPlayer.nextSong = nextSong;
        newPlayer.currentSongUrl = url;

        return newPlayer;
    }
}