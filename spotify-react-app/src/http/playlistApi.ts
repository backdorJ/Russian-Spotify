import Playlist from "../models/Playlist";
import {$authHost} from "./index";
// @ts-ignore
import {ResponseWithMessage} from "../utils/dto/responseWithMessage";
import playlist from "../commonComponents/Playlist/Playlist";

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
            }));
        
        if (response.status !== 200 || response.data === undefined)
            return new Array<Playlist>();

        let result: Array<Playlist> = [];

        for (let i = 0; i < response.data.entities.length; i++) {
            const playlist = response.data.entities[i];

            result[i] = Playlist.init(
                playlist.id,
                playlist.playlistName,
                playlist.imageId,
                playlist.authorName,
                playlist.releaseDate,
                playlist.isAlbum,
                playlist.isInFavorite);
        }

        return result;
    }

export const addPlaylist = async (playlistName: string, fileId: string) => {
    let body: any = {
        playlistName: playlistName,
        songsIds: [],
        isAlbum: false
    }

    if (fileId !== '')
        body.imageId = fileId

    const response = await $authHost.post('api/Playlist/CreatePlaylist', body)

    if (response.status === 200)
        return new ResponseWithMessage(200, '', response.data)

    return new ResponseWithMessage(response.status, response.data.message)
}

export const editPlaylist = async (playlistId: string, playlistName: string, fileId: string, songsIds: Array<string>) => {
    let body: any = {
        playlistName: playlistName,
        songsIds: songsIds
    }

    if (playlistName === '')
        body.playlistName = null

    if (fileId !== '')
        body.imageId = fileId

    const response = await $authHost.put(`api/Playlist/EditPlaylist/${playlistId}`, body)

    if (response.status === 200)
        return new ResponseWithMessage(200, '', response.data)

    return new ResponseWithMessage(response.status, response.data.message)
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
            response.data.isInFavorite
        );
    }

export const tryAddPlaylistToFavorites: (playlistId: string) => Promise<boolean> =
    async (playlistId): Promise<boolean> => {
        const response = await $authHost.post(`api/Playlist/Playlist/${playlistId}`);
        return response.status === 200;
    }

export const tryRemovePlaylistFromFavorites: (playlistId: string) => Promise<boolean> =
    async (playlistId): Promise<boolean> => {
        const response = await $authHost.delete(`api/Playlist/RemovePlaylistFromFavorite/${playlistId}`);
        return response.status === 200;
    }
