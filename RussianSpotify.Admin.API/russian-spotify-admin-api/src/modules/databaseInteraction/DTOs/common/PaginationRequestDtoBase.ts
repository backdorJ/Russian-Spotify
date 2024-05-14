import {ApiProperty} from "@nestjs/swagger";

export class PaginationRequestDtoBase {
    @ApiProperty({name: 'pageNumber', required: false, default: 1})
    pageNumber:number;
    @ApiProperty({name: 'pageSize', required: false, default: 20})
    pageSize:number;
}