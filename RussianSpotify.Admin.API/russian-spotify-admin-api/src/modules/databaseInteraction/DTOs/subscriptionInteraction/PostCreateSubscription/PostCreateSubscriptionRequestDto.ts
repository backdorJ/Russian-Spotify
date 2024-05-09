import {ApiProperty} from "@nestjs/swagger";

export class PostCreateSubscriptionRequestDto {
    @ApiProperty({name: 'dateStart'})
    dateStart: Date;
    @ApiProperty({name: 'dateEnd'})
    dateEnd: Date;
    @ApiProperty({name: 'userId'})
    userId: string;
}