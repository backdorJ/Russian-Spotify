import {GetUsersByFilterResponseItemDto} from "./GetUsersByFilterResponseItemDto";

export class GetUsersByFilterResponseDto {
    users: GetUsersByFilterResponseItemDto[];
    totalCount: number;
}