import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Song} from "../../DAL/entities/Song.entity";
import {Repository} from "typeorm";
import {
    GetSongsByFilterRequestDto
} from "../../modules/databaseInteraction/DTOs/songInteraction/GetSongsByFilter/GetSongsByFilterRequestDto";
import {
    GetSongsByFilterResponseDto
} from "../../modules/databaseInteraction/DTOs/songInteraction/GetSongsByFilter/GetSongsByFilterResponseDto";
import {
    PatchUpdateSongRequestDto
} from "../../modules/databaseInteraction/DTOs/songInteraction/PatchUpdateSong/PatchUpdateSongRequestDto";
import {SongDto} from "../../modules/databaseInteraction/DTOs/common/SongDto";
import {SongUser} from "../../DAL/entities/SongUser.entity";
import {File} from "../../DAL/entities/File.entity";
import {DeleteRequesDtotBase} from "../../modules/databaseInteraction/DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/DeleteResponseDtoBase";
import {
    PostCreateSongRequestDto
} from "../../modules/databaseInteraction/DTOs/songInteraction/PostCreateSong/PostCreateSongRequestDto";
import {PostCreateResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/PostCreateResponseDtoBase";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SongService {
    constructor(@InjectRepository(Song) private readonly songRepository: Repository<Song>,
                @InjectRepository(SongUser) private readonly songUserRepository: Repository<SongUser>,
                @InjectRepository(File) private readonly fileRepository: Repository<File>) {
    }

    async createSong(request: PostCreateSongRequestDto): Promise<PostCreateResponseDtoBase> {
        let song = this.songRepository.create();

        song.Id = uuidv4();
        song.SongName = request.name;
        song.ImageId = request.imageId;
        song.Duration = request.duration;
        song.CategoryId = request.categoryId;

        await this.songRepository.save(song);

        return new PostCreateResponseDtoBase(song.Id);
    }

    async getSongsByFilter(request: GetSongsByFilterRequestDto): Promise<GetSongsByFilterResponseDto> {
        let query = this.songRepository.createQueryBuilder("s")
            .where("1 = 1");

        if (request.songId)
            query = query
                .andWhere('"s"."Id" = :id', {id: request.songId});

        if (request.songName)
            query = query
                .andWhere('LOWER("s"."SongName") LIKE \':songName%\'',
                    {songName: request.songName.toLowerCase()});

        if (request.lessThenPlaysNumber)
            query = query
                .andWhere('"s"."PlaysNumber" < :playsNumber',
                    {playsNumber: request.lessThenPlaysNumber});

        if (request.moreThenPlaysNumber)
            query = query
                .andWhere('"s"."PlaysNumber" > :playsNumber',
                    {playsNumber: request.moreThenPlaysNumber});

        if (request.moreThenDuration)
            query = query
                .andWhere('"s"."Duration" > :duration',
                    {duration: request.moreThenDuration});

        if (request.lessThenDuration)
            query = query
                .andWhere('"s"."Duration" < :duration',
                    {duration: request.lessThenDuration});

        if (request.categoryId)
            query = query
                .andWhere('"s"."CategoryId" = :categoryId', {categoryId: request.categoryId});

        // @ts-ignore
        if (request.authorsIds && (!Array.isArray(request.authorsIds) || request.authorsIds.length > 0)) {
            if (!Array.isArray(request.authorsIds))
                request.authorsIds = [request.authorsIds];
            query = query
                .innerJoin('SongUser', "su", '"s"."Id" = "su"."SongsId"')
                .andWhere('"su"."AuthorsId" IN (:...authorsIds)', {authorsIds: request.authorsIds});
        }
        // @ts-ignore
        if (request.orderByPlaysNumber && request.orderByPlaysNumber == 'true')
            query = query
                .addOrderBy('"s"."PlaysNumber"', "ASC")
        // @ts-ignore
        else if (request.orderByPlaysNumber && request.orderByPlaysNumber == 'false')
            query = query
                .addOrderBy('"s"."PlaysNumber"', "DESC");

        if (request.albumId)
            query = query
                .innerJoin('PlaylistSong', 'ps', '"s"."Id" = "ps"."SongsId"')
                .andWhere('"ps"."PlaylistId" = :albumId', {albumId: request.albumId});

        let totalCount = await query.getCount();

        query = query
            .skip(request.pageSize * (request.pageNumber - 1))
            .take(request.pageSize);

        if (!request.authorsIds || request.authorsIds.length == 0)
            query = query.innerJoin('SongUser', 'su', '"s"."Id" = "su"."SongsId"')
                .innerJoin('AspNetUsers', 'u', '"u"."Id" = "su"."AuthorsId"');
        else
            query = query
                .innerJoin('AspNetUsers', 'u', '"u"."Id" = "su"."AuthorsId"');

        query = query.addSelect([
            '"s"."Id"',
            '"s"."SongName"',
            '"s"."Duration"',
            '"s"."ImageId"',
            '"su"."AuthorsId"',
            '"u"."UserName"',
            '"s"."PlaysNumber"',
            '"s"."CategoryId"'
        ]);

        let resultFromDb = await query.execute();

        let result = new GetSongsByFilterResponseDto();
        result.totalCount = totalCount;

        for (let i = 0; i < resultFromDb.length; i++) {
            let song = result.songs.find(x => x.id === resultFromDb[i].Id);
            if (!song) {
                song = new SongDto();
                result.songs.push(song);
            }
            song.id = resultFromDb[i].Id;
            song.authorNames.push(resultFromDb[i].UserName);
            song.authorIds.push(resultFromDb[i].AuthorsId);
            song.duration = resultFromDb[i].duration;
            song.name = resultFromDb[i].name;
            song.imageId = resultFromDb[i].ImageId;
            song.playsNumber = resultFromDb[i].PlaysNumber;
            song.categoryId = resultFromDb[i].CategoryId;
        }

        return result;
    }

    async deleteSong(request: DeleteRequesDtotBase): Promise<DeleteResponseDtoBase> {
        let song = await this.songRepository.findOneByOrFail({"Id": request.id});

        if (!song)
            throw new NotFoundException("Song not found");

        await this.songRepository.createQueryBuilder()
            .delete()
            .from(Song)
            .where("Id = :id", {id: request.id})
            .execute()

        return new DeleteResponseDtoBase(request.id);
    }

    async updateSong(request: PatchUpdateSongRequestDto): Promise<void> {
        let song = await this.songRepository.findOneByOrFail({"Id": request.id});

        if (!song)
            throw new NotFoundException("Song not found");

        if (request.imageId)
            song.ImageId = request.imageId;

        if (request.duration)
            song.Duration = request.duration;

        if (request.name)
            song.SongName = request.name;

        // @ts-ignore
        if (request.addAuthorsIds && (!Array.isArray(request.addAuthorsIds) || request.addAuthorsIds.length > 0)) {
            if (!Array.isArray(request.addAuthorsIds))
                request.addAuthorsIds = [request.addAuthorsIds];

            let insertValues = request.addAuthorsIds.map(x => {
                let newSongUser = new SongUser();
                newSongUser.SongsId = request.id;
                newSongUser.AuthorsId = x;
                return newSongUser;
            });

            await this.songUserRepository.createQueryBuilder()
                .insert()
                .values(insertValues)
                .execute()
        }

        // @ts-ignore
        if (request.removeAuthorsIds && (!Array.isArray(request.removeAuthorsIds) || request.removeAuthorsIds.length > 0)) {
            if (!Array.isArray(request.removeAuthorsIds))
                request.removeAuthorsIds = [request.removeAuthorsIds];

            await this.songUserRepository.createQueryBuilder()
                .delete()
                .from(SongUser)
                .where("AuthorsId IN (:...ids)", {ids: request.removeAuthorsIds})
                .execute()
        }

        if (request.playsNumber)
            song.PlaysNumber = request.playsNumber;

        if (request.fileId) {
            let file = await this.fileRepository.findOneByOrFail({"Id": request.fileId});
            file.SongId = request.id;
            await this.songRepository.save(file);
        }
    }
}