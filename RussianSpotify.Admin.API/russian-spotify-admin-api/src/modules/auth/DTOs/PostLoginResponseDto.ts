import {ApiProperty, ApiResponse} from "@nestjs/swagger";

@ApiResponse({description: "Authentication Response", status: 200})
export class PostLoginResponseDto {
    @ApiProperty({description: "JWT"})
    accessToken: string;
    @ApiProperty({description: "Refresh Token"})
    refreshToken: string;
}