import {Injectable, NotFoundException} from "@nestjs/common";
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
    PatchUpdatePlaylistRequestDto
} from "../../modules/databaseInteraction/DTOs/playlistInteraction/UpdatePlaylist/PatchUpdatePlaylistRequestDto";
import {DeleteRequesDtotBase} from "../../modules/databaseInteraction/DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/DeleteResponseDtoBase";
import {
    GetPlaylistsByFilterResponseItemDto
} from "../../modules/databaseInteraction/DTOs/playlistInteraction/GetPlaylistsByFilter/GetPlaylistsByFilterResponseItemDto";
import {PlaylistSong} from "../../DAL/entities/PlaylistSong.entity";
import {
    PostCreatePlaylistRequestDto
} from "../../modules/databaseInteraction/DTOs/playlistInteraction/PostCreatePlaylist/PostCreatePlaylistRequestDto";
import {PostCreateResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/PostCreateResponseDtoBase";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlaylistService {
    constructor(@InjectRepository(Playlist) private readonly playlistRepository: Repository<Playlist>,
                @InjectRepository(PlaylistSong) private readonly playlistSongRepository: Repository<PlaylistSong>) {
    }

    async createPlaylist(request: PostCreatePlaylistRequestDto): Promise<PostCreateResponseDtoBase> {
        let playlist = this.playlistRepository.create();

        playlist.Id = uuidv4();
        playlist.PlaylistName = request.name;
        playlist.AuthorId = request.authorId;
        // @ts-ignore
        playlist.IsAlbum = request.isAlbum == "true";
        playlist.ImageId = request.imageId;
        playlist.ReleaseDate = new Date(Date.now()).toISOString();

        await this.playlistRepository.save(playlist);

        return new PostCreateResponseDtoBase(playlist.Id);
    }

    async getPlaylistsByFilter(request: GetPlaylistsByFilterRequestDto)
        : Promise<GetPlaylistsByFilterResponseDto> {
        let query =
            this.playlistRepository.createQueryBuilder('p').where('1 = 1');

        if(request.id)
            query = query.andWhere('"p"."Id" = :id', {id: request.id});

        // @ts-ignore
        if(request.isAlbum && request.isAlbum == "true")
            query = query.andWhere('"p"."IsAlbum" = true');
        else if(request.isAlbum)
            query = query.andWhere('"p"."IsAlbum" = false');

        if(request.name)
            query = query.andWhere('LOWER("p"."PlaylistName") LIKE :name',
                { name: `%${request.name.toLowerCase()}%` });

        if(request.authorId)
            query = query.andWhere('"p"."AuthorId" = :authorId', {authorId: request.authorId});

        if(request.authorName)
            query = query.leftJoinAndSelect('AspNetUsers', 'u', '1 = 1')
                .andWhere('LOWER("u"."UserName") LIKE :name',
                    { name: `%${request.authorName.toLowerCase()}%` });

        if(!request.authorName)
            query = query.innerJoin('AspNetUsers', 'u', '"p"."AuthorId" = "u"."Id"');

        query = query.addSelect([
            '"p"."Id"',
            '"p"."PlaylistName"',
            '"p"."ImageId"',
            '"p"."ReleaseDate"',
            '"p"."IsAlbum"',
            '"p"."AuthorId"',
            '"u"."UserName"',
        ])

        const totalCount = await query.getCount();

        query = query
            .skip(request.pageSize * (request.pageNumber - 1))
            .take(request.pageSize)

        const resultFromDb = await query.execute();
        
        let result = new GetPlaylistsByFilterResponseDto();
        result.totalCount = totalCount;
        result.playlists = resultFromDb.map(x => {
            let item = new GetPlaylistsByFilterResponseItemDto();
            item.id = x.Id;
            item.name = x.PlaylistName;
            item.imageId = x.ImageId;
            item.isAlbum = x.IsAlbum;
            item.authorId = x.AuthorId;
            item.authorName = x.UserName;
            item.releaseDate = x.ReleaseDate.toString();
            return item;
        })

        return result;
    }

    async deletePlaylist(request: DeleteRequesDtotBase): Promise<DeleteResponseDtoBase> {
        let playlist = await this.playlistRepository.findOneByOrFail({"Id": request.id});

        if(!playlist)
            throw new NotFoundException("Playlist not found");

        await this.playlistRepository.createQueryBuilder()
            .delete()
            .from(Playlist)
            .where("Id = :id", { id: request.id })
            .execute()

        return new DeleteResponseDtoBase(request.id);
    }

    async updatePlaylist(request: PatchUpdatePlaylistRequestDto): Promise<void> {
        let playlist = await this.playlistRepository.findOneByOrFail({"Id": request.id});

        if(!playlist)
            throw new NotFoundException("Playlist not found");

        // @ts-ignore
        if(request.isAlbum && request.isAlbum == "true")
            playlist.IsAlbum = true;
        else if(request.isAlbum)
            playlist.IsAlbum = false;

        if(request.name)
            playlist.PlaylistName = request.name;

        if(request.authorId)
            playlist.AuthorId = request.authorId;

        if(request.releaseDate)
            playlist.ReleaseDate = new Date(request.releaseDate).toISOString();

        if(request.addSongsIds)
        {
            if(!Array.isArray(request.addSongsIds))
                request.addSongsIds = [request.addSongsIds];

            let playlistSongs: PlaylistSong[] = [];
            request.addSongsIds.forEach(id => {
                let item = this.playlistSongRepository.create();
                item.PlaylistsId = request.id;
                item.SongsId = id;
                playlistSongs.push(item);
            })

            await this.playlistSongRepository.save(playlistSongs);
        }

        if(request.removeSongsIds)
        {
            if(!Array.isArray(request.removeSongsIds))
                request.removeSongsIds = [request.removeSongsIds];

            await this.playlistRepository.createQueryBuilder()
                .delete()
                .from(PlaylistSong)
                .where("PlaylistsId IN (:...songsIds)", {songsIds: request.removeSongsIds})
                .execute();
        }
    }
}