import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Patch, Post, Query} from "@nestjs/common";
import {PlaylistService} from "../../../services/databaseInteraction/playlistService";
import {
    GetPlaylistsByFilterRequestDto
} from "../DTOs/playlistInteraction/GetPlaylistsByFilter/GetPlaylistsByFilterRequestDto";
import {
    GetPlaylistsByFilterResponseDto
} from "../DTOs/playlistInteraction/GetPlaylistsByFilter/GetPlaylistsByFilterResponseDto";
import {PatchUpdatePlaylistRequestDto} from "../DTOs/playlistInteraction/UpdatePlaylist/PatchUpdatePlaylistRequestDto";
import {DeleteRequesDtotBase} from "../DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../DTOs/common/DeleteResponseDtoBase";
import {
    PostCreatePlaylistRequestDto
} from "../DTOs/playlistInteraction/PostCreatePlaylist/PostCreatePlaylistRequestDto";
import {PostCreateResponseDtoBase} from "../DTOs/common/PostCreateResponseDtoBase";

@ApiBearerAuth()
@ApiTags("PlaylistInteraction")
@Controller("api/PlaylistInteraction")
export class PlaylistInteractionController {
    constructor(@Inject(PlaylistService) private readonly playlistService: PlaylistService) {}

    @Post("CreatePlaylist")
    async createPlaylist(@Body() postCreatePlaylistRequestDto: PostCreatePlaylistRequestDto)
        : Promise<PostCreateResponseDtoBase> {
        return await this.playlistService.createPlaylist(postCreatePlaylistRequestDto);
    }

    @Get("GetPlaylistsByFilter")
    async getPlaylistsByFilter(@Query() getPlaylistsByFilterRequestDto: GetPlaylistsByFilterRequestDto)
        : Promise<GetPlaylistsByFilterResponseDto> {
        return await this.playlistService.getPlaylistsByFilter(getPlaylistsByFilterRequestDto);
    }

    @Delete("DeletePlaylist")
    async deletePlaylist(@Body() deletePlaylistRequestDto: DeleteRequesDtotBase): Promise<DeleteResponseDtoBase> {
        return await this.playlistService.deletePlaylist(deletePlaylistRequestDto);
    }

    @Patch("UpdatePlaylist")
    async updatePlaylist(@Body() patchUpdatePlaylistRequestDto: PatchUpdatePlaylistRequestDto): Promise<void> {
        await this.playlistService.updatePlaylist(patchUpdatePlaylistRequestDto);
    }
}