import {ApiProperty} from "@nestjs/swagger";

export class PostLoginRequestDto {
    @ApiProperty({description: "Email Address"})
    email: string;
    @ApiProperty({description: "Password"})
    password: string;
}