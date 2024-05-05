import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {PostLoginRequestDto} from "./DTOs/PostLoginRequestDto";
import * as process from "node:process";
import {HttpService} from "@nestjs/axios";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PostLoginResponseDto} from "./DTOs/PostLoginResponseDto";

@ApiTags("Auth")
@Controller('api/auth')
export class AuthController {
    constructor(private readonly httpService: HttpService) {}

    @ApiResponse({status: 400, type: HttpException, description: "Wrong username or password"})
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: PostLoginResponseDto })
    @ApiOperation({description: "Login"})
    @Post("/login")
    async login(@Body() request: PostLoginRequestDto): Promise<any> {
        let observableResponse =
            this.httpService.post(`${process.env.RUSSIAN_SPOTIFY_API_BASE_URL}Auth/Login`, request);

        const response = await observableResponse.toPromise();

        if(response.status === 200)
            return response.data;

        throw new HttpException(response.data.message, response.status);
    }
}
