import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Playlist} from "../../DAL/entities/Playlist.entity";
import {Repository} from "typeorm";
import {
    GetPlaylistsByFilterRequestDto
} from "../../modules/databaseInteraction/DTOs/playlistInteraction/GetPlaylistsByFilter/GetPlaylistsByFilterRequestDto";
import {
    GetPlaylistsByFilterResponseDto
} from "../../modules/databaseInteraction/DTOs/playlistInteraction/GetPlaylistsByFilter/GetPlaylistsByFilterResponseDto";
import {
    DeletePlaylistRequestDto
} from "../../modules/databaseInteraction/DTOs/playlistInteraction/DeletePlaylist/DeletePlaylistRequestDto";
import {
    DeletePlaylistResponseDto
} from "../../modules/databaseInteraction/DTOs/playlistInteraction/DeletePlaylist/DeletePlaylistResponseDto";
import {
    PatchUpdatePlaylistRequestDto
} from "../../modules/databaseInteraction/DTOs/playlistInteraction/UpdatePlaylist/PatchUpdatePlaylistRequestDto";

@Injectable()
export class PlaylistService {
    constructor(@InjectRepository(Playlist) private readonly playlistRepository: Repository<Playlist>) {
    }

    async getPlaylistsByFilter(request: GetPlaylistsByFilterRequestDto)
        : Promise<GetPlaylistsByFilterResponseDto> {
        return await new GetPlaylistsByFilterResponseDto();
    }

    async deletePlaylist(request: DeletePlaylistRequestDto) : Promise<DeletePlaylistResponseDto> {
        return await new DeletePlaylistResponseDto();
    }

    async updatePlaylist(request: PatchUpdatePlaylistRequestDto) : Promise<void>{

    }
}