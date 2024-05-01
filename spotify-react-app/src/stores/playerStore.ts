import Player from "../models/Player";
import {makeAutoObservable} from "mobx";
import Song from "../models/Song";

/**Store для хранения проигрываемой музыки*/
export default class PlayerStore {
    _player: Player = new Player();

    _isPlaying: boolean = true;

    _volume: number = 0.75;

    _currentPlaylist: Song[] = []

    constructor() {
        makeAutoObservable(this)
    }

    get Player() {
        return this._player;
    }

    set Player(player: Player) {
        this._player = player;
    }

    get IsPlaying() {
        return this._isPlaying;
    }

    set IsPlaying(isPlaying: boolean) {
        this._isPlaying = isPlaying;
    }

    get Volume() {
        return this._volume;
    }

    set Volume(volume: number) {
        this._volume = volume;
    }

    get CurrentPlaylist() {
        return this._currentPlaylist;
    }

    set CurrentPlaylist(currentPlaylist: Song[]) {
        this._currentPlaylist = currentPlaylist;
    }
}