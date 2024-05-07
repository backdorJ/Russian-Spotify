import {Injectable, NotFoundException} from "@nestjs/common";
import {
    GetBucketsByFilterRequestDto
} from "../../modules/databaseInteraction/DTOs/bucketInteraction/GetBucketsByFilter/GetBucketsByFilterRequestDto";
import {Bucket} from "../../DAL/entities/Bucket.entity";
import {
    GetBucketsByFilterResponseDto
} from "../../modules/databaseInteraction/DTOs/bucketInteraction/GetBucketsByFilter/GetBucketsByFilterResponseDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SongDto} from "../../modules/databaseInteraction/DTOs/common/SongDto";
import {Song} from "../../DAL/entities/Song.entity";
import {BucketSong} from "../../DAL/entities/BucketSong.entity";
import {
    DeleteBucketRequestDto
} from "../../modules/databaseInteraction/DTOs/bucketInteraction/DeleteBucket/DeleteBucketRequestDto";
import {
    DeleteBucketResponseDto
} from "../../modules/databaseInteraction/DTOs/bucketInteraction/DeleteBucket/DeleteBucketResponseDto";
import {
    PatchUpdateBucketRequestDto
} from "../../modules/databaseInteraction/DTOs/bucketInteraction/PatchUpdateBucket/PatchUpdateBucketRequestDto";

@Injectable()
export class BucketService {
    constructor(@InjectRepository(Bucket) private readonly bucketRepository : Repository<Bucket>,
                @InjectRepository(Song) private readonly songsRepository : Repository<Song>,
                @InjectRepository(BucketSong) private readonly bucketSongRepository: Repository<BucketSong>,) {
    }

    async getBucketsByFilter(request: GetBucketsByFilterRequestDto) : Promise<GetBucketsByFilterResponseDto> {
        let query = this.bucketRepository.createQueryBuilder('b').where("1 = 1");

        if(request.id)
            query = query
                .andWhere('"b"."Id" = :id', {id: request.id})
        else if(request.userId)
            query = query
                .andWhere('"b"."UserId" = :userId', {userId: request.userId})

        query = query
            .innerJoin(BucketSong, 'bs', '"b"."Id" = "bs"."BucketsId"', { quotedTableName: true })
            .addSelect([
                '"b"."Id"',
                '"b"."UserId"',
                '"bs"."SongsId"'
            ]);

        let resultDbItems = await query.execute();

        let result = new GetBucketsByFilterResponseDto();
        result.userId = resultDbItems[0].UserId;
        result.bucketId = resultDbItems[0].Id;
        result.songs = resultDbItems.map(x => {
            if(!result.songs.find(s => x.id == s.id)) {
                let songItem = new SongDto();
                songItem.id = x.SongsId;
                return songItem;
            }
        });

        let songsQuery = this.songsRepository
            .createQueryBuilder('s')
            .where('"s"."Id" IN (:...songIds)', {songIds: result.songs.map(x => x.id)})
            .innerJoin('SongUser', 'su', '"s"."Id" = "su"."SongsId"')
            .innerJoin('AspNetUsers', 'u', '"u"."Id" = "su"."AuthorsId"')
            .addSelect([
                '"s"."Id"',
                '"s"."SongName"',
                '"s"."Duration"',
                '"s"."ImageId"',
                '"su"."AuthorsId"',
                '"u"."UserName"',
                '"s"."PlaysNumber"',
                '"s"."CategoryId"'
            ]);

        let songs = await songsQuery.execute();

        console.log(songs);

        for(let i = 0; i < songs.length; i++) {
            let song = result.songs.find(x => x.id === songs[i].Id);
            song.authorNames.push(songs[i].UserName);
            song.authorIds.push(songs[i].AuthorsId);
            song.duration = songs[i].duration;
            song.name = songs[i].name;
            song.imageId = songs[i].ImageId;
            song.playsNumber = songs[i].PlaysNumber;
            song.categoryId = songs[i].CategoryId;
        }

        return result;
    }

    async deleteBucket(request: DeleteBucketRequestDto) : Promise<DeleteBucketResponseDto> {
        let bucket = await this.bucketRepository.findOneByOrFail({"Id": request.id});

        if(!bucket)
            throw new NotFoundException("Bucket not found");

        await this.bucketRepository
            .createQueryBuilder()
            .delete()
            .from(Bucket)
            .where("Id = :id", { id: request.id })
            .execute()

        return new DeleteBucketResponseDto(request.id);
    }

    async updateBucket(request: PatchUpdateBucketRequestDto) : Promise<void> {
        let bucket = await this.bucketRepository.findOneByOrFail({"Id": request.id});

        if(!bucket)
            throw new NotFoundException("Bucket not found");

        // @ts-ignore
        if(request.removeSongIds && (!Array.isArray(request.removeSongIds) || request.removeSongIds.length > 0)) {
            if(!Array.isArray(request.removeSongIds))
                request.removeSongIds = [request.removeSongIds];

            await this.bucketSongRepository.createQueryBuilder()
                .softDelete()
                .from(BucketSong)
                .where("SongsId in (:...songsIds)", {songsIds: request.removeSongIds})
                .execute()
        }

        // @ts-ignore
        if(request.addSongsIds && (!Array.isArray(request.addSongsIds) || request.addSongsIds.length > 0)) {
            if(!Array.isArray(request.addSongsIds))
                request.addSongsIds = [request.addSongsIds];

            const insertValues = request.addSongsIds.map(x => {
                let newBucketSong = new BucketSong();
                newBucketSong.BucketsId = request.id;
                newBucketSong.SongIds = x;
                return newBucketSong;
            });

            await this.bucketSongRepository.createQueryBuilder()
                .insert()
                .values(insertValues)
                .execute();
        }
    }
}