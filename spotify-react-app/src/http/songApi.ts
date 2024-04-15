import Song from "../models/Song";
import {$authHost} from "./index";
import Player from "../models/Player";
import User from "../models/User";

/** Возвращает список песен
 * @param pageNumber - для номера страницы
 * @param songCount - количество пессен, которые вернулись с api
 * */
export const getSongs: (pageNumber: number, songCount: number) => Promise<Song[]> =
    async (pageNumber, songCount): Promise<Song[]> => {
    const response =
        await $authHost.get(`api/Song?pageNumber=${pageNumber}&pageSize=${songCount}&isFavourite=false`);

        if (response.status !== 200 || response.data === undefined)
            return new Array<Song>();

        let result: Song[] = [];
        for (let i: number = 0; i < response.data.entities.length; ++i) {
            const songItem = response.data.entities[i];

            result[i] = Song.init(songItem.songId, songItem.songName, songItem.imageId,
                songItem.duration, songItem.category, songItem.authors, null, null, null);
        }

        for (let i = 1; i < response.data.entities.length; ++i)
            result[i].prevSong = result[i - 1];

        for (let i = 0; i < response.data.entities.length - 1; ++i)
            result[i].nextSong = result[i + 1];

        return result;
    }


/** Возвращает Player с api для прослушивания песни
 * @param song - песня, которая будет сейчас играть
 * @param user - для проверки наличия актуальной подписки
 * */
export const    getSong: (song: Song, user: User) => Player
    = (song, user) => {
    if (!user.isSubscribed)
        return new Player();

    return Player.init(song, `${process.env.REACT_APP_SPOTIFY_API}api/Song/${song.songId}`);
}

/** Возвращает любимые песни
 * @param pageNumber - номер страницы
 * @param pageSize - кол-во на странице
 * */
export const getFavouriteSongs: (pageNumber: number, pageSize: number) => Promise<Song[]> =
    async (pageNumber, pageSize): Promise<Song[]> => {
    const response = await $authHost.get(`api/Song?pageNumber=${pageNumber}&pageSize=${pageSize}&isFavourite=true`);

        if (response.status !== 200 || response.data === undefined)
            return new Array<Song>();

        let result: Song[] = [];

        for (let i = 0; i < response.data.entities.length; i++) {
            const song = response.data.entities[i];

            result[i] = Song.init(
                song.songId,
                song.songName,
                song.imageId,
                song.duration,
                song.category,
                song.authors,
                null,
                null,
                true)
        }

        for (let i = 1; i < response.data.entities.length; ++i)
            result[i].prevSong = result[i - 1];

        for (let i = 0; i < response.data.entities.length - 1; ++i)
            result[i].nextSong = result[i + 1];

        return result;
    }

export const getSongInfo: (songId: string) => Promise<Song> =
    async (songId): Promise<Song> => {

        const response = await $authHost.get(`api/Song/SongInfo/${songId}`);

        if (response.status !== 200)
            return new Song();

        return Song.init(
            response.data.id,
            response.data.songName,
            response.data.imageId,
            response.data.duration,
            response.data.category,
            response.data.authors,
            null,
            null,
            response.data.isHave
        );
    }

export const getSongsByNameFilter = async (filter: string, pageNumber: number, pageSize: number) => {
    const response = await $authHost.get('api/Song/GetSongsByFilter?' +
        new URLSearchParams({
            filterName: 'SongName',
            filterValue: filter,
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString()
        }))

    let songs = response.data.entities.map((i: {
        songId: string;
        songName: string;
        imageId: string;
        duration: number;
        category: string;
        authors: string[];
        isHave: boolean | null;
    }) => Song.init(
        i.songId,
        i.songName,
        i.imageId,
        i.duration,
        i.category,
        i.authors,
        null,
        null,
        i.isHave))

    for (let i = 1; i < songs.length; ++i)
        songs[i].prevSong = songs[i - 1];

    for (let i = 0; i < songs.length - 1; ++i)
        songs[i].nextSong = songs[i + 1];

    if (songs.length > 1)
        songs[songs.length - 1].nextSong = songs[0]

    return songs
}
