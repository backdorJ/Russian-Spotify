import {ApiProperty} from "@nestjs/swagger";

export class PatchUpdateBucketRequestDto {
    @ApiProperty({name: 'id'})
    id: string;
    @ApiProperty({name: 'addSongsIds', required: false})
    addSongsIds: string[];
    @ApiProperty({name: 'removeSongIds', required: false})
    removeSongIds: string[];
}