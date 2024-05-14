import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersStatistic} from "../../DAL/entities/russianSpotifyStatisticDbEntities/UsersStatistic.entity";
import {Repository} from "typeorm";
import {BaseGetStatisticRequestDto} from "../../modules/statistic/DTOs/common/BaseGetStatisticRequestDto";
import {GetUsersStatisticResponseDto} from "../../modules/statistic/DTOs/userStatistic/GetUsersStatisticResponseDto";

@Injectable()
export class UserStatisticService {
    constructor(@InjectRepository(UsersStatistic) private readonly usersStatisticRepository
                    : Repository<UsersStatistic>) {
    }

    async getUsersStatistic(request: BaseGetStatisticRequestDto): Promise<GetUsersStatisticResponseDto>{
        let totalCount = await this.usersStatisticRepository.count();

        const statisticNumber = Number(request.statisticNumber)
        let dbResult: UsersStatistic;

        if(request.statisticNumber && statisticNumber <= totalCount)
            dbResult = await this.usersStatisticRepository
                .findOneByOrFail({ statisticCount: request.statisticNumber});
        else
            dbResult = await this.usersStatisticRepository
                .findOneByOrFail({statisticCount: totalCount});

        let response = new GetUsersStatisticResponseDto();

        response.statisticCollectionDate = dbResult.statisticCollectionDate;
        response.statisticCount = dbResult.statisticCount;
        response.countActive = dbResult.countActive;
        response.countInactive = dbResult.countInactive;
        response.totalCount = totalCount;
        response.allUsersCount = dbResult.allUsersCount;

        return response;
    }
}