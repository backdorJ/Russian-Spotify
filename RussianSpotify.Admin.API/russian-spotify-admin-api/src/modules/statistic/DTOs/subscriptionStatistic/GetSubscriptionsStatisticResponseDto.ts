import {BaseGetStatisticResponseDto} from "../common/BaseGetStatisticResponseDto";

export class GetSubscriptionsStatisticResponseDto extends BaseGetStatisticResponseDto{
    countActive: number;
    countBought: number;
    countInactive: number;
}