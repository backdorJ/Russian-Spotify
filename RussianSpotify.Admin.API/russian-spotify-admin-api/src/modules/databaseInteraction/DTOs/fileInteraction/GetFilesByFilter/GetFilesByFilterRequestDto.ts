import {PaginationRequestDtoBase} from "../../common/PaginationRequestDtoBase";
import {ApiProperty} from "@nestjs/swagger";

export class GetFilesByFilterRequestDto extends PaginationRequestDtoBase{
    @ApiProperty({name: 'id'})
    id: string;

    @ApiProperty({name: 'name'})
    name: string;

    @ApiProperty({name: 'isSongFile'})
    isSongFile: boolean | null;

    @ApiProperty({name: 'isImageFile'})
    isImageFile: boolean | null;

    @ApiProperty({name: 'address'})
    address: string;

    @ApiProperty({name: 'sizeMoreThen'})
    sizeMoreThen: number;

    @ApiProperty({name: 'sizeLessThen'})
    sizeLessThen: number;

    @ApiProperty({name: 'orderBySize'})
    orderBySize: boolean | null;
}