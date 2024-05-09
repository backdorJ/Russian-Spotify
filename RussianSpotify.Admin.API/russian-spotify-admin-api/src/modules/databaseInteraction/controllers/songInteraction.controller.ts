import {Body, Controller, Delete, Get, Inject, Patch, Post, Query, Req} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {SongService} from "../../../services/databaseInteraction/songService";
import {GetSongsByFilterRequestDto} from "../DTOs/songInteraction/GetSongsByFilter/GetSongsByFilterRequestDto";
import {GetSongsByFilterResponseDto} from "../DTOs/songInteraction/GetSongsByFilter/GetSongsByFilterResponseDto";
import {PatchUpdateSongRequestDto} from "../DTOs/songInteraction/PatchUpdateSong/PatchUpdateSongRequestDto";
import {DeleteRequesDtotBase} from "../DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../DTOs/common/DeleteResponseDtoBase";
import {PostCreateSongRequestDto} from "../DTOs/songInteraction/PostCreateSong/PostCreateSongRequestDto";
import {PostCreateResponseDtoBase} from "../DTOs/common/PostCreateResponseDtoBase";

@ApiBearerAuth()
@ApiTags("SongInteraction")
@Controller('api/SongInteraction')
export class SongInteractionController {
    constructor(@Inject(SongService) private readonly songService: SongService) {}

    @Post("CreateSong")
    async createSong(@Body() postCreateSongRequestDto: PostCreateSongRequestDto): Promise<PostCreateResponseDtoBase> {
        return await this.songService.createSong(postCreateSongRequestDto)
    }

    @Get("GetSongsByFilter")
    async getSongs(@Query() getSongsRequestDto: GetSongsByFilterRequestDto)
        : Promise<GetSongsByFilterResponseDto> {
        return await this.songService.getSongsByFilter(getSongsRequestDto);
    }

    @Delete("DeleteSong")
    async deleteSong(@Body() deleteSongRequestDto: DeleteRequesDtotBase) : Promise<DeleteResponseDtoBase> {
        return await this.songService.deleteSong(deleteSongRequestDto);
    }

    @Patch("UpdateSong")
    async updateBucket(@Body() patchUpdateSongRequestDto: PatchUpdateSongRequestDto) : Promise<void>{
        await this.songService.updateSong(patchUpdateSongRequestDto);
    }
}