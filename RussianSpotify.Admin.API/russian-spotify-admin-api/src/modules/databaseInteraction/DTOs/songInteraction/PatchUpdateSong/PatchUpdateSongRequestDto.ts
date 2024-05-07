import {ApiProperty} from "@nestjs/swagger";

export class PatchUpdateSongRequestDto{
    @ApiProperty({name: 'id'})
    id: string;
    @ApiProperty({name: 'name', required: false})
    name: string;
    @ApiProperty({name: 'imageId', required: false})
    imageId: string;
    @ApiProperty({name: 'duration', required: false})
    duration: number;
    @ApiProperty({name: 'addAuthorsIds', required: false})
    addAuthorsIds: string[] = [];
    @ApiProperty({name: 'removeAuthorsIds', required: false})
    removeAuthorsIds: string[] = [];
    @ApiProperty({name: 'fileId', required: false})
    fileId: string;
    @ApiProperty({name: 'playsNumber', required: false})
    playsNumber: number;
}