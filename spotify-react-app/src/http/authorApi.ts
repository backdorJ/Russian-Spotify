import Author from "../models/Author";
import {$authHost} from "./index";
import {songFilters} from "./filters/songFilters";
import Song from "../models/Song";
import Playlist from "../models/Playlist";
import {playlistFilters} from "./filters/playlistFilter";
import {getImage} from "./fileApi";

export const getAuthor: (authorName: string, pageNumberForSongs: number, pageSizeForSongs: number, pageNumberForPlaylists: number, pageSizeForPlaylists: number ) => Promise<Author> =
    async (authorName, pageNumberForSongs = 1, pageSizeForSongs = 5, pageNumberForPlaylists = 1,  pageSizeForPlaylists = 3): Promise<Author> => {
        const authorInfoResponse =
            await $authHost.get(`api/Author?Name=${authorName}`);

        if(authorInfoResponse.status !== 200 || authorInfoResponse.data === undefined)
            return new Author();

        const songs = await getSongs(authorName, pageNumberForSongs, pageSizeForSongs);

        const playlists = await getPlaylists(authorName, pageNumberForPlaylists, pageSizeForPlaylists);

        return Author.init(
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
                filterName: 'PlaylistName',
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
        const authorPlaylistsResponse = await $authHost.get(`api/Song/GetPlaylistsByFilter?` +
            new URLSearchParams({
                filterName: 'PlaylistName',
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
