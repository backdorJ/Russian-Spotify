import Playlist from "../models/Playlist";
import {$authHost} from "./index";

/** Возвращает список альбомов по фильтру
 @param filterName - название фильтра
 @param filterValue - значение фильтра
 @param pageNumber - номер страницы(начинается с 1)
 @param pageSize - количество плейлистов, которые должны вернуться с api
 * */
export const getPlaylistsByFilter = async (filterName: string, filterValue: string, pageNumber: number, pageSize: number) => {
    if(!filterValue || !filterName)
        return [];

    const response = await $authHost.get(`api/Playlist/GetPlaylistsByFilter?` +
        new URLSearchParams({
            filterName: filterName,
            filterValue: filterValue,
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString()
        }))

    if (response.status !== 200 || response.data === undefined)
        return [];

    return response.data.entities.map((i: {
        id: string;
        playlistName: string;
        imageId: string;
        authorName: string;
        releaseDate: Date;
        isAlbum: boolean;
    }) => Playlist.init(
        i.id,
        i.playlistName,
        i.imageId,
        i.authorName,
        i.releaseDate,
        i.isAlbum,
    ))
}

export const addPlaylist = async (playlistName: string, fileId: string) => {
    // TODO: make post add playlist
    // TODO: make two options: with fileId and without it
}

export const getPlaylistInfo: (playlistId: string | undefined) => Promise<Playlist> =
    async (playlistId): Promise<Playlist> => {
        if (playlistId === undefined)
            return new Playlist();

        const response = await $authHost.get(`api/Playlist/GetPlaylist/${playlistId}`);

        if (response.status !== 200 || response.data === undefined)
            return new Playlist();

        return Playlist.init(
            playlistId,
            response.data.playlistName,
            response.data.imageId,
            response.data.authorName,
            response.data.releaseDate,
            response.data.isAlbum,
        );
    }