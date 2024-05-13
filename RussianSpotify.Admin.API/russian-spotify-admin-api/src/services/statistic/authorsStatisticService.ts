import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {AuthorsStatistic} from "../../DAL/entities/russianSpotifyStatisticDbEntities/AuthorsStatistic.entity";
import {Repository} from "typeorm";
import {GetAuthorStatisticRequestDto} from "../../modules/statistic/DTOs/authorStatistic/GetAuthorStatisticRequestDto";
import {
    GetAuthorStatisticResponseDto
} from "../../modules/statistic/DTOs/authorStatistic/GetAuthorStatisticResponseDto";

@Injectable()
export class AuthorsStatisticService {
    constructor(@InjectRepository(AuthorsStatistic) private readonly authorStatisticRepository
                    : Repository<AuthorsStatistic>) {
    }

    async getAuthorStatistics(request: GetAuthorStatisticRequestDto) : Promise<GetAuthorStatisticResponseDto>{
        let query = this.authorStatisticRepository.createQueryBuilder("as")
            .where('"as"."AuthorId" = :authorId', {authorId: request.authorId});

        let dbResult: AuthorsStatistic;
        const statisticNumber = Number(request.statisticNumber)
        const totalCount = await query.getCount();
        if(request.statisticNumber && statisticNumber <= totalCount)
            dbResult = await this.authorStatisticRepository
                .findOneByOrFail({authorId: request.authorId, statisticCount: request.statisticNumber});
        else
            dbResult = await this.authorStatisticRepository
                .findOneByOrFail({authorId: request.authorId, statisticCount: totalCount});

        let response = new GetAuthorStatisticResponseDto();

        response.authorId = request.authorId;
        response.statisticCount = dbResult.statisticCount;
        response.albumsCount = dbResult.albumsCount;
        response.playsCount = dbResult.playsCount;
        response.songsCount = dbResult.songsCount;
        response.totalPlaysCount = dbResult.totalPlaysCount;
        response.totalAlbumsCount = dbResult.totalAlbumsCount;
        response.totalSongsCount = dbResult.totalSongsCount;
        response.statisticCollectionDate = dbResult.statisticCollectionDate;
        response.totalCount = totalCount;

        return response;
    }
}