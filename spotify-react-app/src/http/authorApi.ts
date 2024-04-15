import AuthorPage from "../models/AuthorPage";
import Author from "../models/Author";
import {$authHost} from "./index";
import {songFilters} from "./filters/songFilters";
import Song from "../models/Song";
import Playlist from "../models/Playlist";
import {playlistFilters} from "./filters/playlistFilter";
import {getImage} from "./fileApi";
import AlbumLittle from "../models/AlbumLittle";


export const getAuthor: (authorName: string, pageNumberForSongs: number, pageSizeForSongs: number, pageNumberForPlaylists: number, pageSizeForPlaylists: number ) => Promise<AuthorPage> =
    async (authorName, pageNumberForSongs = 1, pageSizeForSongs = 5, pageNumberForPlaylists = 1,  pageSizeForPlaylists = 3): Promise<AuthorPage> => {
        const authorInfoResponse =
            await $authHost.get(`api/Author/Author?Name=${authorName}`);

        console.log(`author: ${authorInfoResponse.status}`)

        if(authorInfoResponse.status !== 200 || authorInfoResponse.data === undefined)
            return new AuthorPage();

        const songs = await getSongs(authorName, pageNumberForSongs, pageSizeForSongs);

        const playlists = await getPlaylists(authorName, pageNumberForPlaylists, pageSizeForPlaylists);

        return AuthorPage.init(
            authorInfoResponse.data.name,
            getImage(authorInfoResponse.data.authorPhotoId),
            songs,
            playlists
            );
    }

const getSongs: (authorName: string, pageNumber: number, pageSize: number) => Promise<Song[]> =
    async (authorName, pageNumber = 1, pageSize= 5): Promise<Song[]> => {
        const authorSongsResponse = await $authHost.get(`api/Song/GetSongsByFilter?` +
            new URLSearchParams({
                filterName: songFilters.authorFilter,
                filterValue: authorName,
                pageNumber: pageNumber.toString(),
                pageSize: pageSize.toString()
            }));

        let songs: Song[] = []

        if(authorSongsResponse.status !== 200 || authorSongsResponse.data === undefined)
            return songs;

        for(let i: number = 0; i < authorSongsResponse.data.entities.length; ++i){
            const songItem = authorSongsResponse.data.entities[i];

            songs[i] = Song.init(songItem.songId, songItem.songName, songItem.imageId,
                songItem.duration, songItem.category, songItem.authors, null, null, null);
        }

        for(let i = 1; i < authorSongsResponse.data.entities.length; ++i)
            songs[i].prevSong = songs[i-1];

        for(let i = 0; i < authorSongsResponse.data.entities.length - 1; ++i)
            songs[i].nextSong = songs[i + 1];

        return songs;
    }

const getPlaylists: (authorName: string, pageNumber: number, pageSize: number) => Promise<Playlist[]> =
    async (authorName, pageNumber = 1, pageSize = 3): Promise<Playlist[]> => {
        const authorPlaylistsResponse = await $authHost.get(`api/Playlist/GetPlaylistsByFilter?` +
            new URLSearchParams({
                filterName: playlistFilters.authorFilter,
                filterValue: authorName,
                pageNumber: pageNumber.toString(),
                pageSize: pageSize.toString()
            }));

        let playlists: Playlist[] = [];

        if(authorPlaylistsResponse.status !== 200 || authorPlaylistsResponse.data === undefined)
            return playlists;

        for(let i: number = 0; i < authorPlaylistsResponse.data.length; ++i){
            playlists[i] = Playlist.init(
                authorPlaylistsResponse.data.id,
                authorPlaylistsResponse.data.playlistName,
                authorPlaylistsResponse.data.imageId,
                authorPlaylistsResponse.data.authorName,
                authorPlaylistsResponse.data.releaseDate,
                [],
                true,
                []
            );
        }

        return playlists;
    }

export const getAuthorsByFilter = async (filter: string, pageNumber: number, pageSize: number) => {
    const response = await $authHost.get('api/Author/GetAuthorsByFilter?' +
        new URLSearchParams({
            filterName: 'AuthorName',
            filterValue: filter,
            playlistCount: '2',
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
