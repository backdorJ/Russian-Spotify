import {ApiProperty} from "@nestjs/swagger";

export class PostCreateBucketRequestDto {
    @ApiProperty({name: 'userId'})
    userId: string;
}