import {songFilters} from "../http/filters/songFilters";
import {getSongsByFilter} from "../http/songApi";
import songSources from "../utils/song/songSources";
import {GetSongs} from "../utils/dto/song/getSongs";

const loadDynamicSongs = async (filterName: string, filterValue: string, pageNumber: number, pageSize: number): Promise<GetSongs> => {
    let response = await getSongsByFilter(filterName, filterValue, pageNumber, pageSize)

    let lastSong = response.songs[response.songs.length - 1]
    lastSong.source = songSources.Search
    lastSong.nextLoad = (() => loadDynamicSongs(filterName, filterValue, pageNumber + 1, pageSize))
    response.songs[response.songs.length - 1] = lastSong

    return response
}

export default loadDynamicSongs