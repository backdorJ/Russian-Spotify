import {ApiProperty} from "@nestjs/swagger";
import {BaseGetStatisticRequestDto} from "../common/BaseGetStatisticRequestDto";

export class GetAuthorStatisticRequestDto extends BaseGetStatisticRequestDto{
    @ApiProperty({name: 'id', type: 'string', required: true})
    authorId: string;
}