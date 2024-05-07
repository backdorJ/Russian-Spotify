import {ApiProperty} from "@nestjs/swagger";

export class DeleteSubscriptionRequestDto{
    @ApiProperty({name: 'id'})
    id: string;
}