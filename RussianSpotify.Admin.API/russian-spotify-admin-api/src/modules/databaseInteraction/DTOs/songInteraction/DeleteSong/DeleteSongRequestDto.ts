import {ApiProperty} from "@nestjs/swagger";

export class DeleteSongRequestDto {
    @ApiProperty({name: 'id'})
    id: string;
}