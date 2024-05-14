import {Module} from "@nestjs/common";
import {AuthorStatisticController} from "./controllers/authorStatistic.controller";
import {SubscriptionsStatisticController} from "./controllers/subscriptionsStatistic.controller";
import {UsersStatisticController} from "./controllers/usersStatistic.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthorsStatistic} from "../../DAL/entities/russianSpotifyStatisticDbEntities/AuthorsStatistic.entity";
import {
    SubscriptionsStatistic
} from "../../DAL/entities/russianSpotifyStatisticDbEntities/SubscriptionsStatistic.entity";
import {UsersStatistic} from "../../DAL/entities/russianSpotifyStatisticDbEntities/UsersStatistic.entity";
import { config } from 'dotenv';
import {ormconfig} from "../../DAL/ormconfig";
import {AuthorsStatisticService} from "../../services/statistic/authorsStatisticService";
import {UserStatisticService} from "../../services/statistic/usersStatisticService";
import {SubscriptionsStatisticService} from "../../services/statistic/subscriptionsStatisticService";

config()

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        TypeOrmModule.forFeature([AuthorsStatistic, SubscriptionsStatistic, UsersStatistic]),
        StatisticModule
    ],
    controllers: [AuthorStatisticController, SubscriptionsStatisticController, UsersStatisticController],
    providers: [AuthorsStatisticService, UserStatisticService, SubscriptionsStatisticService],
})

export class StatisticModule {}