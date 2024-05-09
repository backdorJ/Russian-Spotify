import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {PostLoginRequestDto} from "../DTOs/PostLoginRequestDto";
import * as process from "node:process";
import {HttpService} from "@nestjs/axios";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PostLoginResponseDto} from "../DTOs/PostLoginResponseDto";
import {JwtService} from "@nestjs/jwt";
import {claimTypes} from "../../../constants/claimTypes";

@ApiTags("Auth")
@Controller('api/Auth')
export class AuthController {
    constructor(private readonly httpService: HttpService,
                private readonly jwtService: JwtService) {}

    @ApiResponse({status: 400, type: HttpException, description: "Wrong username or password"})
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: PostLoginResponseDto })
    @ApiOperation({description: "Login"})
    @Post("Login")
    async login(@Body() request: PostLoginRequestDto): Promise<any> {
        let observableResponse =
            this.httpService.post(`${process.env.RUSSIAN_SPOTIFY_API_BASE_URL}Auth/Login`, request);

        const response = await observableResponse.toPromise();

        if(response.status === 200) {
            const decodedToken = this.jwtService.verify(response.data.accessToken, {secret: process.env.JWT_SECRET}); // Декодированный JWT

            const roleClaim = decodedToken[claimTypes.Role];

            if(roleClaim == 'Админ')
                return response.data.accessToken;
        }

        throw new HttpException(response.data.message, response.status);
    }
}
