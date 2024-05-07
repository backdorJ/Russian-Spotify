import {Body, Controller, Delete, Get, Inject, Patch, Query, Req} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {SongService} from "../../../services/databaseInteraction/songService";
import {GetSongsByFilterRequestDto} from "../DTOs/songInteraction/GetSongsByFilter/GetSongsByFilterRequestDto";
import {GetSongsByFilterResponseDto} from "../DTOs/songInteraction/GetSongsByFilter/GetSongsByFilterResponseDto";
import {DeleteSongRequestDto} from "../DTOs/songInteraction/DeleteSong/DeleteSongRequestDto";
import {DeleteSongResponseDto} from "../DTOs/songInteraction/DeleteSong/DeleteSongResponseDto";
import {PatchUpdateSongRequestDto} from "../DTOs/songInteraction/PatchUpdateSong/PatchUpdateSongRequestDto";

@ApiBearerAuth()
@ApiTags("SongInteraction")
@Controller('api/SongInteraction')
export class SongInteractionController {
    constructor(@Inject(SongService) private readonly songService: SongService) {}

    @Get("GetSongsByFilter")
    async getSongs(@Query() getSongsRequestDto: GetSongsByFilterRequestDto)
        : Promise<GetSongsByFilterResponseDto> {
        return await this.songService.getSongsByFilter(getSongsRequestDto);
    }

    @Delete("DeleteSong")
    async deleteSong(@Body() deleteSongRequestDto: DeleteSongRequestDto) : Promise<DeleteSongResponseDto> {
        return await this.songService.deleteSong(deleteSongRequestDto);
    }

    @Patch("UpdateSong")
    async updateBucket(@Body() patchUpdateSongRequestDto: PatchUpdateSongRequestDto) : Promise<void>{
        await this.songService.updateSong(patchUpdateSongRequestDto);
    }
}