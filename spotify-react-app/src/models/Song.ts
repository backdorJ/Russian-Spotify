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

    /** Список имён авторов песни */
    authors: string[];

    constructor() {
        this.songId = "";
        this.songName = "";
        this.imageId = "";
        this.duration = 0;
        this.category = "";
        this.authors = [];
    }

    static init(id: string,
                name: string,
                imageId: string,
                duration: number,
                category: string,
                authors: string[]) {

        let newSong = new Song();

        newSong.songId = id;
        newSong.songName = name;
        newSong.imageId = imageId;
        newSong.duration = duration;
        newSong.category = category;
        newSong.authors = authors;

        return newSong;
    }
}