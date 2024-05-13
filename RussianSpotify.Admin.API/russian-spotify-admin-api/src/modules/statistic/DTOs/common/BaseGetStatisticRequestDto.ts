import {ApiProperty} from "@nestjs/swagger";

export class BaseGetStatisticRequestDto {
    @ApiProperty({name: 'statisticNumber', type: 'string | null', required: false})
    statisticNumber: number | null = null;
}