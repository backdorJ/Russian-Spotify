import {ApiProperty} from "@nestjs/swagger";

export class GetBucketsByFilterRequestDto{
    @ApiProperty({name: 'id', required: false})
    id: string;
    @ApiProperty({name: 'userId', required: false})
    userId: string;
}