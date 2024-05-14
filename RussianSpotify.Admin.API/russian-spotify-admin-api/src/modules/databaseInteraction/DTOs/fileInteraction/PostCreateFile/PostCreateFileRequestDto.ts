import {ApiProperty} from "@nestjs/swagger";

export class PostCreateFileRequestDto {
    @ApiProperty({name: 'file', type: FormData})
    fileStream: FormData;
}