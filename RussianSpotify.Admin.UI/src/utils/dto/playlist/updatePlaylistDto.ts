export default class UpdatePlaylistDto {
    id: string;
    name: string | null = null
    isAlbum: boolean | null = null
    addSongsIds: string[] | null = null
    removeSongsIds: string[] | null = null
    authorId: string | null = null
    releaseDate: Date | null = null

    constructor(id: string,
                name: string | null = null,
                isAlbum: boolean | null = null,
                addSongsIds: string[] | null = null,
                removeSongsIds: string[] | null = null,
                authorId: string | null = null,
                releaseDate: Date | null = null) {
        this.id = id;
        this.name = name;
        this.isAlbum = isAlbum;
        this.addSongsIds = addSongsIds;
        this.removeSongsIds = removeSongsIds;
        this.authorId = authorId;
        this.releaseDate = releaseDate;
    }
}