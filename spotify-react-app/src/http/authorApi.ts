import {$authHost} from "./index";
import {songFilters} from "./filters/songFilters";
// @ts-ignore
import {playlistFilters} from "./filters/playlistFilters";
import {getImage} from "./fileApi";
import AlbumLittle from "../models/AlbumLittle";
import {getSongsByFilter} from "./songApi";
import {getPlaylistsByFilter} from "./playlistApi";
import Author from "../models/Author";
import AuthorModel from "../models/AuthorPage";


export const getAuthor: (authorName: string, pageNumberForSongs: number, pageSizeForSongs: number, pageNumberForPlaylists: number, pageSizeForPlaylists: number) => Promise<AuthorModel> =
    async (authorName, pageNumberForSongs = 1, pageSizeForSongs = 5, pageNumberForPlaylists = 1, pageSizeForPlaylists = 3): Promise<AuthorModel> => {
        const authorInfoResponse =
            await $authHost.get(`api/Author/Author?Name=${authorName}`);

        if (authorInfoResponse.status !== 200 || authorInfoResponse.data === undefined)
            return new AuthorModel();

        const songs = await getSongsByFilter(songFilters.authorSongsFilter, authorName, pageNumberForSongs, pageSizeForSongs);

        const playlists = await getPlaylistsByFilter(playlistFilters.authorPlaylistsFilter, authorName, pageNumberForPlaylists, pageSizeForPlaylists);
        
        return AuthorModel.init(
            authorInfoResponse.data.name,
            getImage(authorInfoResponse.data.authorPhotoId),
            songs.songs,
            playlists.value.playlists
        );
    }

export const getAuthorsByFilter = async (filterName: string, filter: string, playlistCount: number, pageNumber: number, pageSize: number) => {
    const response = await $authHost.get('api/Author/GetAuthorsByFilter?' +
        new URLSearchParams({
            filterName: filterName,
            filterValue: filter,
            playlistCount: playlistCount.toString(),
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString()
        }))

    return response.data.entities.map((i: {
        authorId: string;
        authorName: string;
        imageId: string;
        albums: any[];
    }) => Author.init(
        i.authorId,
        i.authorName,
        i.imageId,
        i.albums.map(e => AlbumLittle.init(e.playlistId, e.playlistName))))
}
