import {ApiProperty} from "@nestjs/swagger";

export class DeleteUserRequestDto {
    @ApiProperty({name: "id"})
    id : string;
}