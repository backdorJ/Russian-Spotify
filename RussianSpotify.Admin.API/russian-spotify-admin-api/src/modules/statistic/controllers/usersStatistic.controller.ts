import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Inject, Query} from "@nestjs/common";
import {BaseGetStatisticRequestDto} from "../DTOs/common/BaseGetStatisticRequestDto";
import {GetUsersStatisticResponseDto} from "../DTOs/userStatistic/GetUsersStatisticResponseDto";
import {UserStatisticService} from "../../../services/statistic/usersStatisticService";

@ApiTags('UserStatistic')
@Controller('api/UserStatistic')
export class UsersStatisticController {
    constructor(@Inject(UserStatisticService) private readonly userStatisticService: UserStatisticService) {
    }

    @Get("GetUsersStatistic")
    async getUsersStatistic(@Query() getUsersStatisticRequestDto: BaseGetStatisticRequestDto)
        : Promise<GetUsersStatisticResponseDto>{
        return await this.userStatisticService.getUsersStatistic(getUsersStatisticRequestDto);
    }
}