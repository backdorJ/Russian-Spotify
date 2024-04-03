import * as stream from "stream";

// TODO: FIX content
/** DTO для песни которую хочет послушать пользователь*/
export default class SongFile{
    /** Байты песни */
    content: stream | null;

    /** Имя файла */
    fileName: string;

    /** Тип файла */
    contentType: string;

    constructor() {
        this.content = null;
        this.fileName = "";
        this.contentType = "";
    }

    static init(content: stream, fileName: string, contentType: string) {
        let newSongFile = new SongFile();

        newSongFile.content = content;
        newSongFile.fileName = fileName;
        newSongFile.contentType = contentType;

        return newSongFile;
    }
}