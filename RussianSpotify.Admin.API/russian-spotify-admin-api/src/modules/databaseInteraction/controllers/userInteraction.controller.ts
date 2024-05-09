import {Body, Controller, Delete, Get, Inject, Patch, Post, Query} from "@nestjs/common";
import {GetUsersByFilterResponseDto} from "../DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterResponseDto";
import {GetUsersByFilterRequestDto} from "../DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterRequestDto";
import {UsersService} from "../../../services/databaseInteraction/usersService";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {PatchUpdateUserRequestDto} from "../DTOs/userInteractionDTOs/PatchUpdateUser/PatchUpdateUserRequestDto";
import {DeleteRequesDtotBase} from "../DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../DTOs/common/DeleteResponseDtoBase";
import {PostCreateUserRequestDto} from "../DTOs/userInteractionDTOs/PostCreateUser/PostCreateUserRequestDto";
import {PostCreateResponseDtoBase} from "../DTOs/common/PostCreateResponseDtoBase";

@ApiBearerAuth()
@ApiTags("UserInteraction")
@Controller("api/UserInteraction")
export class UserInteractionController {
    constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

    @Post("CreateUser")
    async createUser(@Body() postCreateUserRequestDto: PostCreateUserRequestDto) : Promise<PostCreateResponseDtoBase> {
        return await this.usersService.createUser(postCreateUserRequestDto)
    }

    @Get("GetUsers")
    async getUsers(@Query() getUsersRequestDto: GetUsersByFilterRequestDto): Promise<GetUsersByFilterResponseDto> {
        return await this.usersService.getUsersByFilter(getUsersRequestDto);
    }

    @Delete("DeleteUser")
    async deleteUser(@Body() deleteUserRequestDto: DeleteRequesDtotBase) : Promise<DeleteResponseDtoBase> {
        return await this.usersService.deleteUser(deleteUserRequestDto);
    }

    @Patch("UpdateUser")
    async updateUser(@Body() patchUpdateUserRequestDto: PatchUpdateUserRequestDto): Promise<void>{
        await this.usersService.updateUser(patchUpdateUserRequestDto);
    }
}