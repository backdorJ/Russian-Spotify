import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Inject, Query} from "@nestjs/common";
import {GetAuthorStatisticRequestDto} from "../DTOs/authorStatistic/GetAuthorStatisticRequestDto";
import {GetAuthorStatisticResponseDto} from "../DTOs/authorStatistic/GetAuthorStatisticResponseDto";
import {AuthorsStatisticService} from "../../../services/statistic/authorsStatisticService";

@ApiTags('AuthorStatistic')
@Controller('api/AuthorStatistic')
export class AuthorStatisticController {
    constructor(@Inject(AuthorsStatisticService) private readonly authorStatisticService: AuthorsStatisticService) {
    }

    @Get('/getAuthorStatistic')
    async getAuthorStatistic(@Query() getAuthorStatisticRequestDto: GetAuthorStatisticRequestDto)
        : Promise<GetAuthorStatisticResponseDto>{
        return await this.authorStatisticService.getAuthorStatistics(getAuthorStatisticRequestDto);
    }
}