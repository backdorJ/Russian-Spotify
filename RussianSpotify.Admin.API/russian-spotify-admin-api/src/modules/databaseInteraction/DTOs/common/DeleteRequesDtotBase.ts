import {ApiProperty} from "@nestjs/swagger";

export class DeleteRequesDtotBase{
    @ApiProperty({name: 'id'})
    id: string;
}