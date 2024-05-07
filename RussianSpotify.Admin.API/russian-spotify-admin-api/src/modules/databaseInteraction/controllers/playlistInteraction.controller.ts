import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Patch, Query} from "@nestjs/common";
import {PlaylistService} from "../../../services/databaseInteraction/playlistService";
import {
    GetPlaylistsByFilterRequestDto
} from "../DTOs/playlistInteraction/GetPlaylistsByFilter/GetPlaylistsByFilterRequestDto";
import {
    GetPlaylistsByFilterResponseDto
} from "../DTOs/playlistInteraction/GetPlaylistsByFilter/GetPlaylistsByFilterResponseDto";
import {DeletePlaylistResponseDto} from "../DTOs/playlistInteraction/DeletePlaylist/DeletePlaylistResponseDto";
import {DeletePlaylistRequestDto} from "../DTOs/playlistInteraction/DeletePlaylist/DeletePlaylistRequestDto";
import {PatchUpdatePlaylistRequestDto} from "../DTOs/playlistInteraction/UpdatePlaylist/PatchUpdatePlaylistRequestDto";

@ApiTags("PlaylistInteraction")
@Controller("api/PlaylistInteraction")
export class PlaylistInteractionController {
    constructor(@Inject(PlaylistService) private readonly playlistService: PlaylistService) {}

    @Get("GetPlaylistsByFilter")
    async getPlaylistsByFilter(@Query() getPlaylistsByFilterRequestDto: GetPlaylistsByFilterRequestDto)
        : Promise<GetPlaylistsByFilterResponseDto> {
        return await this.playlistService.getPlaylistsByFilter(getPlaylistsByFilterRequestDto);
    }

    @Delete("DeletePlaylist")
    async deletePlaylist(@Body() deletePlaylistRequestDto: DeletePlaylistRequestDto): Promise<DeletePlaylistResponseDto> {
        return await this.playlistService.deletePlaylist(deletePlaylistRequestDto);
    }

    @Patch("UpdatePlaylist")
    async updatePlaylist(@Body() patchUpdatePlaylistRequestDto: PatchUpdatePlaylistRequestDto): Promise<void> {
        await this.playlistService.updatePlaylist(patchUpdatePlaylistRequestDto);
    }
}