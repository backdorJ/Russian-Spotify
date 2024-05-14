import {SongDto} from "../../common/SongDto";

export class GetBucketsByFilterResponseDto {
    bucketId: string;
    userId: string;
    songs: SongDto[] = [];
}