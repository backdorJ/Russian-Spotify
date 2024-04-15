import Playlist from "../models/Playlist";
import {$authHost} from "./index";
import Song from "../models/Song";
import {getSongInfo} from "./songApi";

// Получить любимые плейлисты/альбомы
export const getFavouritePlaylists: (pageNumber: number, pageSize: number) => Promise<Playlist[]> =
    async (pageNumber, pageSize): Promise<Playlist[]> => {

    const response = await $authHost.get(`api/Playlist/GetPlaylists?pageNumber=${pageNumber}&pageSize=${pageSize}&isFavourite=true`);

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

        const response = await $authHost.get(`api/Playlist/GetPlaylist/${playlistId}`);

        if (response.status !== 200 || response.data === undefined)
            return new Playlist();

        let playlist = Playlist.init(
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

        for (let i = 0; i < songsIds.length; i++) {
            const song = await getSongInfo(songsIds[i]);

            playlist.songs.push(song);
        }

        for (let i = 1; i < playlist.songs.length; ++i)
            playlist.songs[i].prevSong = playlist.songs[i - 1];

        for (let i = 0; i < playlist.songs.length - 1; ++i)
            playlist.songs[i].nextSong = playlist.songs[i + 1];

        if (playlist.songs.length > 1)
            playlist.songs[playlist.songs.length - 1].nextSong = playlist.songs[0]

        return playlist;
    }

export const getPlaylistsByNameFilter = async (filter: string, pageNumber: number, pageSize: number) => {
    const response = await $authHost.get(`api/Playlist/GetPlaylistsByFilter?` +
        new URLSearchParams({
            filterName: 'PlaylistName',
            filterValue: filter,
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString()
        }))

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
        new Array<Song>(),
        i.isAlbum,
        new Array<string>()
    ))
}

export const getPlaylistsShuffled = async (pageNumber: number, pageSize: number) => {
    const response = await $authHost.get(`api/Playlist/GetPlaylistsByFilter?` +
        new URLSearchParams({
            filterName: 'AlbumShuffled',
            filterValue: 'sth',
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString()
        }))

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
        new Array<Song>(),
        i.isAlbum,
        new Array<string>()
    ))
}

export const addPlaylist = async (playlistName: string, fileId: string) => {
    // TODO: make post add playlist
    // TODO: make two options: with fileId and without it
}