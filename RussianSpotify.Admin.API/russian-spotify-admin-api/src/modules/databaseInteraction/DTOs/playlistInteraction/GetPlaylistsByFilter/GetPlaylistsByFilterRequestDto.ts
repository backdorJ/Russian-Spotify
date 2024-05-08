import {ApiProperty} from "@nestjs/swagger";
import {PaginationRequestDtoBase} from "../../common/PaginationRequestDtoBase";

export class GetPlaylistsByFilterRequestDto extends PaginationRequestDtoBase{
    @ApiProperty({name: 'id', required: false})
    id: string;
    @ApiProperty({name: 'authorId', required: false})
    authorId: string;
    @ApiProperty({name: 'authorName', required: false})
    authorName: string;
    @ApiProperty({name: 'name', required: false})
    name: string;
    @ApiProperty({name: 'isAlbum', required: false})
    isAlbum: boolean | null = null;
}