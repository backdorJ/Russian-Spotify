import {BaseGetStatisticResponseDto} from "../common/BaseGetStatisticResponseDto";

export class GetAuthorStatisticResponseDto extends BaseGetStatisticResponseDto{
    authorId: string;
    songsCount: number;
    totalSongsCount: number;
    playsCount: number;
    totalPlaysCount: number;
    albumsCount: number;
    totalAlbumsCount: number;
}