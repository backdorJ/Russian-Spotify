import {PaginationRequestDtoBase} from "../../common/PaginationRequestDtoBase";
import {ApiProperty} from "@nestjs/swagger";

export class GetFilesByFilterRequestDto extends PaginationRequestDtoBase {
    @ApiProperty({name: 'id', required: false})
    id: string;

    @ApiProperty({name: 'name', required: false})
    name: string;

    @ApiProperty({name: 'isSongFile', required: false})
    isSongFile: boolean | null;

    @ApiProperty({name: 'isImageFile', required: false})
    isImageFile: boolean | null;

    @ApiProperty({name: 'address', required: false})
    address: string;

    @ApiProperty({name: 'sizeMoreThen', required: false})
    sizeMoreThen: number;

    @ApiProperty({name: 'sizeLessThen', required: false})
    sizeLessThen: number;

    @ApiProperty({name: 'orderBySize', required: false})
    orderBySize: boolean | null;
}