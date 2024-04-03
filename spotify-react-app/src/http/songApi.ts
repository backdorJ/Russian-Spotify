import Song from "../models/Song";
import {$authHost} from "./index";
import SongFile from "../models/SongFile";
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
        console.log(songItem);

        result[i] = Song.init(songItem.songId, songItem.songName, songItem.imageId,
            songItem.duration, songItem.category, songItem.authors);
    }

    return result;
}

// TODO: FIX + прикрутить к плееру
/** Возвращает SongFile с api для прослушивания песни
 * @param songId - id песни из бд
 * @param user - для проверки наличия актуальной подписки
 * */
export const getSong: (songId: string, user: User) =>  Promise<SongFile>
        = async (songId, user) => {
    if(!user.isSubscribed)
        return new SongFile();

    const response = await $authHost.get(`api/Song/${songId}`);

    if(response.status === 200 && response.data !== undefined)
        return SongFile.init(response.data.file.content,
            response.data.file.name,
            response.data.file.contentType);

    return new SongFile();
}