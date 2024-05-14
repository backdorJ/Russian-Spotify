import {ApiProperty} from "@nestjs/swagger";

export class PostCreatePlaylistRequestDto {
    @ApiProperty({name: 'name'})
    name: string;
    @ApiProperty({name: 'imageId'})
    imageId: string;
    @ApiProperty({name: 'authorId'})
    authorId: string;
    @ApiProperty({name: 'isAlbum'})
    isAlbum: boolean | null = null;
}