import {ApiProperty} from "@nestjs/swagger";

export class PatchUpdatePlaylistRequestDto{
    @ApiProperty({name: 'id', required: true})
    id: string;
    @ApiProperty({name: 'name', required: false})
    name: string;
    @ApiProperty({name: 'isAlbum', required: false})
    isAlbum: boolean;
    @ApiProperty({name: 'addSongsIds', required: false})
    addSongsIds: string[];
    @ApiProperty({name: 'removeSongsIds', required: false})
    removeSongsIds: string[];
    @ApiProperty({name: 'authorId', required: false})
    authorId: string;
    @ApiProperty({name: 'releaseDate', required: false})
    releaseDate: Date;
}