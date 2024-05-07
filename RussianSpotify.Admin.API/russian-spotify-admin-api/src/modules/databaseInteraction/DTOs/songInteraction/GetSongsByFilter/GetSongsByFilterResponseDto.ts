import {SongDto} from "../../common/SongDto";

export class GetSongsByFilterResponseDto {
    songs: SongDto[] = [];
    totalCount: number;
}