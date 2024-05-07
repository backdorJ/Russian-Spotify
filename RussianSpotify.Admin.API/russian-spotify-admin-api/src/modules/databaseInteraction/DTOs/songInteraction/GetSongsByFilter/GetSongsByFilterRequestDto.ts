import {ApiProperty} from "@nestjs/swagger";

export class GetSongsByFilterRequestDto{
    @ApiProperty({name: 'pageNumber', required: false, default: 1})
    pageNumber:number;
    @ApiProperty({name: 'pageSize', required: false, default: 20})
    pageSize:number;
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
}