export class GetSongsByFilterDto {
    authorsIds: string[] | null = null;
    songId: string | null = null;
    songName: string | null = null;
    moreThenPlaysNumber: number | null = null;
    lessThenPlaysNumber: number | null = null;
    orderByPlaysNumber: boolean | null = null;
    categoryId: string | null = null;
    moreThenDuration: number | null = null;
    lessThenDuration: number | null = null;
    albumId: string | null = null;
    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number,
                pageSize: number,
                authorsIds: string[] | null = null,
                songName: string | null = null,
                songId: string | null = null,
                moreThenPlaysNumber: number | null = null,
                lessThenPlaysNumber: number | null = null,
                orderByPlaysNumber: boolean | null = null,
                categoryId: string | null = null,
                moreThenDuration: number | null = null,
                lessThenDuration: number | null = null,
                albumId: string | null = null) {
        this.authorsIds = authorsIds;
        this.songId = songId;
        this.songName = songName;
        this.moreThenPlaysNumber = moreThenPlaysNumber;
        this.lessThenPlaysNumber = lessThenPlaysNumber;
        this.orderByPlaysNumber = orderByPlaysNumber;
        this.categoryId = categoryId;
        this.moreThenDuration = moreThenDuration;
        this.lessThenDuration = lessThenDuration;
        this.albumId = albumId;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}