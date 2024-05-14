import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Inject, Query} from "@nestjs/common";
import {BaseGetStatisticRequestDto} from "../DTOs/common/BaseGetStatisticRequestDto";
import {GetSubscriptionsStatisticResponseDto} from "../DTOs/subscriptionStatistic/GetSubscriptionsStatisticResponseDto";
import {SubscriptionsStatisticService} from "../../../services/statistic/subscriptionsStatisticService";

@ApiTags("SubscriptionStatistic")
@Controller("api/SubscriptionStatistic")
export class SubscriptionsStatisticController {
    constructor(@Inject(SubscriptionsStatisticService) private readonly subscriptionsStatisticService
                    : SubscriptionsStatisticService) {
    }

    @Get('/getSubscriptionsStatistic')
    async getSubscriptionsStatistic(@Query() getSubscriptionsStatisticRequestDto: BaseGetStatisticRequestDto)
        : Promise<GetSubscriptionsStatisticResponseDto>{
        return await this.subscriptionsStatisticService.getSubscriptionsStatistic(getSubscriptionsStatisticRequestDto);
    }
}