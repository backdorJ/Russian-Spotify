export default class AlbumLittle {
    albumId: string;
    albumName: string;

    constructor() {
        this.albumId = "";
        this.albumName = "";
    }

    static init(albumId: string, albumName: string) {
        let newAlbum = new AlbumLittle();

        newAlbum.albumId = albumId;
        newAlbum.albumName = albumName;

        return newAlbum;
    }
}