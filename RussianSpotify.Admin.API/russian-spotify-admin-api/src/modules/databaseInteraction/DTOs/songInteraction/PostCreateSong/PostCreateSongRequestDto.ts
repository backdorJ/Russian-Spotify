import {ApiProperty} from "@nestjs/swagger";

export class PostCreateSongRequestDto {
    @ApiProperty({name: 'name'})
    name: string;
    @ApiProperty({name: 'duration'})
    duration: number;
    @ApiProperty({name: 'imageId'})
    imageId: string;
    @ApiProperty({name: 'categoryId'})
    categoryId: string;
}