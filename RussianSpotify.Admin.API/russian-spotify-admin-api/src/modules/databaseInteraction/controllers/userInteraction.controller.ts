import {Body, Controller, Delete, Get, Inject, Patch, Query} from "@nestjs/common";
import {GetUsersByFilterResponseDto} from "../DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterResponseDto";
import {GetUsersByFilterRequestDto} from "../DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterRequestDto";
import {UsersService} from "../../../services/databaseInteraction/usersService";
import {ApiTags} from "@nestjs/swagger";
import {DeleteUserRequestDto} from "../DTOs/userInteractionDTOs/DeleteUser/DeleteUserRequestDto";
import {PatchUpdateUserRequestDto} from "../DTOs/userInteractionDTOs/PatchUpdateUser/PatchUpdateUserRequestDto";
import {DeleteUserResponseDto} from "../DTOs/userInteractionDTOs/DeleteUser/DeleteUserResponseDto";

@ApiTags("UserInteraction")
@Controller("api/databaseInteraction")
export class UserInteractionController {
    constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

    @Get("GetUsers")
    async getUsers(@Query() getUserRequestDto: GetUsersByFilterRequestDto): Promise<GetUsersByFilterResponseDto> {
        return await this.usersService.getUsersByFilter(getUserRequestDto);
    }

    @Delete("DeleteUser")
    async deleteUser(@Body() deleteUserRequestDto: DeleteUserRequestDto) : Promise<DeleteUserResponseDto> {
        return await this.usersService.deleteUser(deleteUserRequestDto);
    }

    @Patch("UpdateUser")
    async updateUser(@Body() patchUpdateUserRequestDto: PatchUpdateUserRequestDto): Promise<void>{
        await this.usersService.updateUser(patchUpdateUserRequestDto);
    }
}