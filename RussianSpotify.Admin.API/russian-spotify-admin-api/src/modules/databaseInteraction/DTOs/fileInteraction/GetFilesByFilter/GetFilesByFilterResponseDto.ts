import {GetFilesByFilterResponseItemDto} from "./GetFilesByFilterResponseItemDto";

export class GetFilesByFilterResponseDto {
    totalCount: number;
    files: GetFilesByFilterResponseItemDto[];
}