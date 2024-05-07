import {GetPlaylistsByFilterResponseItemDto} from "./GetPlaylistsByFilterResponseItemDto";

export class GetPlaylistsByFilterResponseDto {
    totalCount: number;
    playlists: GetPlaylistsByFilterResponseItemDto[];
}