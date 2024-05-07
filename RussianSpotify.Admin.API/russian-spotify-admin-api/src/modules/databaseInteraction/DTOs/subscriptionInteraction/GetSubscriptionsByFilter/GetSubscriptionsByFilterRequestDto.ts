import {ApiProperty} from "@nestjs/swagger";

export class GetSubscriptionsByFilterRequestDto {
    @ApiProperty({name: 'pageNumber', required: true, default: 1})
    pageNumber: number;
    @ApiProperty({name: 'pageSize', required: true, default: 20})
    pageSize: number;
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