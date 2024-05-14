import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {
   SubscriptionsStatistic
} from "../../DAL/entities/russianSpotifyStatisticDbEntities/SubscriptionsStatistic.entity";
import {Repository} from "typeorm";
import {BaseGetStatisticRequestDto} from "../../modules/statistic/DTOs/common/BaseGetStatisticRequestDto";
import {
   GetSubscriptionsStatisticResponseDto
} from "../../modules/statistic/DTOs/subscriptionStatistic/GetSubscriptionsStatisticResponseDto";

@Injectable()
export class SubscriptionsStatisticService{
   constructor(@InjectRepository(SubscriptionsStatistic) private readonly subscriptionsStatisticRepository
                   : Repository<SubscriptionsStatistic>) {
   }

   async getSubscriptionsStatistic(request: BaseGetStatisticRequestDto)
       : Promise<GetSubscriptionsStatisticResponseDto>{
      let totalCount = await this.subscriptionsStatisticRepository.count();

      const statisticNumber = Number(request.statisticNumber)
      let dbResult: SubscriptionsStatistic;

      if(request.statisticNumber && statisticNumber <= totalCount)
         dbResult = await this.subscriptionsStatisticRepository
             .findOneByOrFail({ statisticCount: request.statisticNumber});
      else
         dbResult = await this.subscriptionsStatisticRepository
             .findOneByOrFail({statisticCount: totalCount});

      let response = new GetSubscriptionsStatisticResponseDto();

      response.statisticCollectionDate = dbResult.statisticCollectionDate;
      response.statisticCount = dbResult.statisticCount;
      response.countActive = dbResult.countActive;
      response.countBought = dbResult.countBought;
      response.countInactive = dbResult.countInactive;
      response.totalCount = totalCount;

      return response;
   }
}