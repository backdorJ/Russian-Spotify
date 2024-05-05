import {ApiProperty} from "@nestjs/swagger";

export class PatchUpdateUserRequestDto {
    @ApiProperty({name: 'id', required: true})
    id: string | null;
    @ApiProperty({name: 'username', required: false})
    userName: string | null;
    @ApiProperty({name: 'emailConfirmed', required: false})
    emailConfirmed: boolean | null;
    @ApiProperty({name: 'email', required: false})
    email: string | null;
    @ApiProperty({name: 'userPhotoId', required: false})
    userPhotoId: string | null;
    @ApiProperty({name: 'role', required: false})
    role: string;
}