import Author from "../models/Author";
import {$authHost} from "./index";
import {songFilters} from "./filters/songFilters";
import Song from "../models/Song";
import Playlist from "../models/Playlist";
import {playlistFilters} from "./filters/playlistFilter";

export const getAuthor: (authorName: string) => Promise<Author> =
    async (authorName): Promise<Author> => {
        const authorInfoResponse =
            await $authHost.get(`api/Author?Name=${authorName}`);

        if(authorInfoResponse.status !== 200 || authorInfoResponse.data === undefined)
            return new Author();

        const songs = await getSongs(authorName);

        const playlists = await getPlaylists(authorName);

        return Author.init(
            authorInfoResponse.data.name,
            `${process.env.REACT_APP_SPOTIFY_API}api/File/image/${authorInfoResponse.data.authorPhotoId}`,
            songs,
            playlists
            );
    }

const getSongs: (authorName: string) => Promise<Song[]> =
    async (authorName): Promise<Song[]> => {
        const authorSongsResponse =
            await $authHost.get(`api/Song/GetSongsByFilter?FilterName=${songFilters.authorFilter}&FilterValue=${authorName}&PageNumber=1&PageSize=5`);

        let songs: Song[] = []

        if(authorSongsResponse.status !== 200 || authorSongsResponse.data === undefined)
            return songs;

        for(let i: number = 0; i < authorSongsResponse.data.totalCount; ++i){
            const songItem = authorSongsResponse.data.entities[i];

            songs[i] = Song.init(songItem.songId, songItem.songName, songItem.imageId,
                songItem.duration, songItem.category, songItem.authors, null, null, null);
        }

        for(let i = 1; i < authorSongsResponse.data.totalCount; ++i)
            songs[i].prevSong = songs[i-1];

        for(let i = 0; i < authorSongsResponse.data.totalCount - 1; ++i)
            songs[i].nextSong = songs[i + 1];

        return songs;
    }

const getPlaylists: (authorName: string) => Promise<Playlist[]> =
    async (authorName): Promise<Playlist[]> => {
        const authorPlaylistsResponse =
            await $authHost.get(`api/Song/GetPlaylistsByFilter?FilterName=${playlistFilters.authorFilter}&FilterValue=${authorName}&PageNumber=1&PageSize=5`);

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
