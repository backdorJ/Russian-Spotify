import Song from "../models/Song";
import {$authHost} from "./index";
import Player from "../models/Player";
import User from "../models/User";

/** Возвращает список песен по фильтру
 * @param filterName - название фильтра
 * @param filterValue - значение фильтра
 * @param pageNumber - номер страницы(начинается с 1)
 * @param pageSize - количество пессен, которые должны вернуться с api
 * */
export const getSongsByFilter: (filterName: string, filterValue: string, pageNumber: number, pageSize: number) => Promise<Song[]> =
    async (filterName,
           filterValue,
           pageNumber,
           pageSize): Promise<Song[]> => {
    if(!filterValue || !filterName)
        return [];

    const response =
        await $authHost.get(`api/Song/GetSongsByFilter?`+
            new URLSearchParams({
                filterName: filterName,
                filterValue: filterValue,
                pageNumber: pageNumber.toString(),
                pageSize: pageSize.toString()
            }));

        if (response.status !== 200 || response.data === undefined)
            return [];

        let result: Song[] = [];
        for (let i: number = 0; i < response.data.entities.length; ++i) {
            const songItem = response.data.entities[i];

            result[i] = Song.init(
                songItem.songId,
                songItem.songName,
                songItem.imageId,
                songItem.duration,
                songItem.category,
                songItem.authors,
                null,
                null,
                songItem.isInFavorite);
        }

        for (let i = 1; i < response.data.entities.length; ++i)
            result[i].prevSong = result[i - 1];

        for (let i = 0; i < response.data.entities.length - 1; ++i)
            result[i].nextSong = result[i + 1];

        if (result.length > 1)
            result[result.length - 1].nextSong = result[0]

        return result;
    }

/** Возвращает Player(SongContent) с api для прослушивания песни
 * @param song - песня, которая будет сейчас играть
 * @param user - для проверки наличия актуальной подписки
 * */
export const getSong: (song: Song, user: User) => Player
    = (song, user) => {
    if (!user.isSubscribed){
        alert("Необходимо оформить подписку")
        return new Player();
    }

    return Player.init(song, `${process.env.REACT_APP_SPOTIFY_API}api/Song/${song.songId}`);
}

export const tryAddSongToFavorites: (songId: string) => Promise<boolean> =
    async (songId): Promise<boolean> => {
        const response = await $authHost.post(`api/Song/SongFavourite/${songId}`);
        return response.status === 200;
    }

export const tryRemoveSongFromFavorites: (songId: string) => Promise<boolean> =
    async (songId): Promise<boolean> => {
        const response = await $authHost.delete(`api/Song/RemoveSongFromBucket/${songId}`);
        return response.status === 200;
}
