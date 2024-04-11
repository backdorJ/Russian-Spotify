import Playlist from "../models/Playlist";
import {$authHost} from "./index";
import Song from "../models/Song";
import {getSong, getSongInfo} from "./songApi";

// Получить любимые плейлисты/альбомы
export const getFavouritePlaylists: (pageNumber: number, pageSize: number) => Promise<Playlist[]> =
    async (pageNumber, pageSize): Promise<Playlist[]> => {

    const response = await $authHost.get(`api/Song/AllFavouritePlaylists?pageNumber=${pageNumber}&pageSize=${pageSize}`);

    if (response.status !== 200 || response.data === undefined)
        return new Array<Playlist>();

    let result: Array<Playlist> = [];

    for (let i = 0; i < response.data.entities.length; i++){
        const playlist = response.data.entities[i];

        result[i] = Playlist.init(
            playlist.id,
            playlist.playlistName,
            playlist.imageId,
            playlist.authorName,
            playlist.releaseDate,
            new Array<Song>(),
            playlist.isAlbum,
            null);
    }

    return result;
}

export const getPlaylistInfo: (playlistId: string | undefined) => Promise<Playlist> =
    async (playlistId): Promise<Playlist> => {

    if (playlistId === undefined)
        return new Playlist();

    const response = await $authHost.get(`api/Song/FavouritePlaylist/${playlistId}`);

    if (response.status !== 200 || response.data === undefined)
        return new Playlist();

    var playlist = Playlist.init(
        playlistId,
        response.data.playlistName,
        response.data.imageId,
        response.data.authorName,
        response.data.releaseDate,
        new Array<Song>(),
        response.data.isAlbum,
        response.data.songsIds
    );

    const songsIds = response.data.songsIds;

    for (let i = 0; i < songsIds.length; i++){
        const song = await getSongInfo(songsIds[i]);

        playlist.songs.push(song);
    }

    for(let i = 1; i < playlist.songs.length; ++i)
        playlist.songs[i].prevSong = playlist.songs[i-1];

    for(let i = 0; i < playlist.songs.length - 1; ++i)
        playlist.songs[i].nextSong = playlist.songs[i + 1];

    return playlist;
}