import {ApiProperty} from "@nestjs/swagger";
import {PaginationRequestDtoBase} from "../../common/PaginationRequestDtoBase";

export class GetSubscriptionsByFilterRequestDto extends PaginationRequestDtoBase{
    @ApiProperty({name: 'id', required: false})
    id: string;
    @ApiProperty({name: 'userId', required: false})
    userId: string;
    @ApiProperty({name: 'startedAfter', required: false})
    startedAfter: Date;
    @ApiProperty({name: 'finishedAfter', required: false})
    finishedAfter: Date;
    @ApiProperty({name: 'finishedBefore', required: false})
    finishedBefore: Date;
    @ApiProperty({name: 'startedBefore', required: false})
    startedBefore: Date;
    @ApiProperty({name: 'userRole', required: false})
    userRole: string;
    @ApiProperty({name: 'alreadyFinished', required: false})
    alreadyFinished: boolean | null;
}