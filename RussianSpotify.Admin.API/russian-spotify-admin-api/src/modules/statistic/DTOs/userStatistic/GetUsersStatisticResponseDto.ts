import {BaseGetStatisticResponseDto} from "../common/BaseGetStatisticResponseDto";

export class GetUsersStatisticResponseDto extends BaseGetStatisticResponseDto{
    allUsersCount: number;
    countActive: number;
    countInactive: number;
}