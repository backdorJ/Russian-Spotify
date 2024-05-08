import {ApiProperty} from "@nestjs/swagger";
import {PaginationRequestDtoBase} from "../../common/PaginationRequestDtoBase";

export class GetUsersByFilterRequestDto extends PaginationRequestDtoBase{
    @ApiProperty({name: "id", type: String, nullable: true, required: false})
    id : string | null = null;

    @ApiProperty({name: "userName", type: String, nullable: true, required: false})
    userName: string | null = null;

    @ApiProperty({name: "email", type: String, nullable: true, required: false})
    email: string | null = null;

    @ApiProperty({name: "isNullRefresh", type: Boolean, nullable: true, required: false})
    isNullRefresh: boolean | null = null;

    @ApiProperty({name: "isNullRefresh", type: Boolean, nullable: true, required: false})
    isNullAccess: boolean | null = null;

    @ApiProperty({name: "isExpiredRefresh", type: Boolean, nullable: false, required: false})
    isExpiredRefresh: boolean | null = null;

    @ApiProperty({name: "isEmailConfirmed", type: Boolean, nullable: true, required: false})
    isEmailConfirmed: boolean | null = null;

    @ApiProperty({name: "role", type: String, nullable: true, required: false})
    role: string | null = null;
}