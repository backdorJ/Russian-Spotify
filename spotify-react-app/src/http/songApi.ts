import Song from "../models/Song";
import {$authHost} from "./index";
import Player from "../models/Player";
import User from "../models/User";

/** Возвращает список песен
 * @param pageNumber - для номера страницы
 * @param songCount - количество пессен, которые вернулись с api
 * */
export const getSongs: (pageNumber:number, songCount: number) => Promise<Song[]> =
    async (pageNumber, songCount): Promise<Song[]> => {
    const response =
        await $authHost.get(`api/Song?pageNumber=${pageNumber}&pageSize=${songCount}`);

    if(response.status !== 200 || response.data === undefined)
        return new Array<Song>();

    let result: Song[] = [];
    for(let i: number = 0; i < response.data.totalCount; ++i){
        const songItem = response.data.entities[i];

        result[i] = Song.init(songItem.songId, songItem.songName, songItem.imageId,
            songItem.duration, songItem.category, songItem.authors, null);
    }

    for(let i = 0; i < response.data.totalCount - 1; ++i)
        result[i].nextSong = result[i + 1];

    return result;
}

/** Возвращает Player с api для прослушивания песни
 * @param song - песня, которая будет сейчас играть
 * @param nextSong - песня, которая будет играть следующей
 * @param user - для проверки наличия актуальной подписки
 * */
export const getSong: (song: Song, nextSong : Song | null, user: User) => Promise<Player>
        = async (song, nextSong, user) => {
    if(!user.isSubscribed)
        return new Player();

    // const response = await $authHost.get(`api/Song/${song.songId}`);
    // console.log(response.data);
    // if(response.status === 200 && response.data !== undefined) {
        return Player.init(song, nextSong, `${process.env.REACT_APP_SPOTIFY_API}api/Song/${song.songId}`);
    // }

    // return new Player();
}