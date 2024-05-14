import AuthorLittle from "./AuthorLittle";
import SongSources from "../utils/song/songSources";
import songSources from "../utils/song/songSources";
import {GetSongs} from "../utils/dto/song/getSongs";

/** DTO для песни, которая приходит с API(когда запрашивается много песен)*/
export default class Song {
    /** Id песни в бд */
    songId: string;

    /** Название песни */
    songName: string;

    /** Id картинки для песни из бд*/
    imageId: string;

    /** Длительность песни в секундах */
    duration: number;

    /** Жанр песни */
    category: string;

    /** В понравившихся ли песня */
    isInFavorite: boolean;

    /** Список имён авторов песни */
    authors: AuthorLittle[];

    /** Предыдущая песня */
    prevSong: Song | null;

    /** Следущая песня */
    nextSong: Song | null;

    source: string = '';

    nextLoad: (() => Promise<GetSongs>) | undefined = undefined;

    constructor() {
        this.songId = "";
        this.songName = "";
        this.imageId = "";
        this.duration = 0;
        this.category = "";
        this.authors = [];
        this.nextSong = null;
        this.prevSong = null;
        this.isInFavorite = false;
    }

    static init(id: string,
                name: string,
                imageId: string,
                duration: number,
                category: string,
                authors: AuthorLittle[],
                nextSong: Song | null,
                prevSong: Song | null,
                isInFavorite: boolean,
                source: string = songSources.NotSet,
                nextLoad: (() => Promise<GetSongs>) | undefined = undefined) {

        let newSong = new Song();

        newSong.songId = id;
        newSong.songName = name;
        newSong.imageId = imageId;
        newSong.duration = duration;
        newSong.category = category;
        newSong.authors = authors;
        newSong.nextSong = nextSong;
        newSong.prevSong = prevSong;
        newSong.isInFavorite = isInFavorite;
        newSong.source = source;
        newSong.nextLoad = nextLoad;

        return newSong;
    }
}