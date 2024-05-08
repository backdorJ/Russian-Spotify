import {ApiProperty} from "@nestjs/swagger";
import {PaginationRequestDtoBase} from "../../common/PaginationRequestDtoBase";

export class GetSongsByFilterRequestDto extends PaginationRequestDtoBase{
    @ApiProperty({name: 'authorsIds', required: false})
    authorsIds:string[] = [];
    @ApiProperty({name: 'songId', required: false})
    songId:string;
    @ApiProperty({name: 'songName', required: false})
    songName:string;
    @ApiProperty({name: 'moreThenPlaysNumber', required: false})
    moreThenPlaysNumber:number;
    @ApiProperty({name: 'lessThenPlaysNumber', required: false})
    lessThenPlaysNumber:number;
    @ApiProperty({name: 'orderByPlaysNumber', required: false})
    orderByPlaysNumber:boolean;
    @ApiProperty({name: 'categoryId', required: false})
    categoryId: string;
    @ApiProperty({name: 'moreThenDuration', required: false})
    moreThenDuration:number;
    @ApiProperty({name: 'lessThenDuration', required: false})
    lessThenDuration:number;
    @ApiProperty({name: 'albumId', required: false})
    albumId: string;
}