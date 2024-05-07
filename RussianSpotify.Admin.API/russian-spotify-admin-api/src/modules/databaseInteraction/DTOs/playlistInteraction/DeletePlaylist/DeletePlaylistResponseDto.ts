import {ApiProperty} from "@nestjs/swagger";

export class DeletePlaylistResponseDto {
    @ApiProperty({name: 'id', required: true})
    id: string;
}