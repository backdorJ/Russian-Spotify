export default class GetPlaylistsByFilterDto {
    id: string | null = null;
    authorId: string | null = null;
    authorName: string | null = null;
    name: string | null = null;
    isAlbum: boolean | null = null;
    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number,
                pageSize: number,
                id: string | null = null,
                authorId: string | null = null,
                authorName: string | null = null,
                name: string | null = null,
                isAlbum: boolean | null = null) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.id = id;
        this.authorId = authorId;
        this.authorName = authorName;
        this.name = name;
        this.isAlbum = isAlbum;
    }
}