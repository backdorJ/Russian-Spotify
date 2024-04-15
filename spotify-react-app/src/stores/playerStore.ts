import Player from "../models/Player";
import {makeAutoObservable} from "mobx";

/**Store для хранения проигрываемой музыки*/
export default class PlayerStore {
    _player: Player = new Player();

    _isPlaying: boolean = true;

    _volume: number = 0.75;

    constructor() {
        makeAutoObservable(this)
    }

    get Player(){
        return this._player;
    }

    set Player(player: Player){
        this._player = player;
    }

    get IsPlaying(){
        return this._isPlaying;
    }

    set IsPlaying(isPlaying: boolean){
        this._isPlaying = isPlaying;
    }

    get Volume(){
        return this._volume;
    }

    set Volume(volume: number){
        this._volume = volume;
    }
}