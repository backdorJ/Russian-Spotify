import {ApiProperty} from "@nestjs/swagger";

export class DeleteUserResponseDto {
    constructor(id: string) {
        this.id = id;
    }

    @ApiProperty({name: "id", description: "The id of the user that has been deleted"})
    id: string;
}