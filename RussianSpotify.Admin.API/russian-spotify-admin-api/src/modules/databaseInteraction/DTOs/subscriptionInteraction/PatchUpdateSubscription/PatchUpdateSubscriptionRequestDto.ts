import {ApiProperty} from "@nestjs/swagger";

export class PatchUpdateSubscriptionRequestDto{
    @ApiProperty({name: 'id', required: true})
    id: string;
    @ApiProperty({name: 'dateStart', required: false})
    dateStart: Date;
    @ApiProperty({name: 'dateEnd', required: false})
    dateEnd: Date;
    @ApiProperty({name: 'userId', required: false})
    userId: string;
}