import {ApiProperty} from "@nestjs/swagger";

export class DeleteBucketRequestDto {
    @ApiProperty({name: 'id'})
    id: string;
}