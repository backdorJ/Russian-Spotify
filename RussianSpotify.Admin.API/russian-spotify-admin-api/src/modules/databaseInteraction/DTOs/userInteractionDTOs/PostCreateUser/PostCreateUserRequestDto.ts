import {ApiProperty} from "@nestjs/swagger";

export class PostCreateUserRequestDto {
    @ApiProperty({name: 'name'})
    name: string;
    @ApiProperty({name: 'email'})
    email: string;
    @ApiProperty({name: 'photoId'})
    photoId: string;
    @ApiProperty({name: 'role'})
    role: string;
    @ApiProperty({name: 'password'})
    password: string;
}