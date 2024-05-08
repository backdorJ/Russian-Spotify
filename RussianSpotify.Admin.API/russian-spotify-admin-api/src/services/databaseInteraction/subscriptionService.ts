import {Injectable, NotFoundException} from "@nestjs/common";
import {
    GetSubscriptionsByFilterRequestDto
} from "../../modules/databaseInteraction/DTOs/subscriptionInteraction/GetSubscriptionsByFilter/GetSubscriptionsByFilterRequestDto";
import {
    GetSubscriptionsByFilterResponseDto
} from "../../modules/databaseInteraction/DTOs/subscriptionInteraction/GetSubscriptionsByFilter/GetSubscriptionsByFilterResponseDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Subscribe} from "../../DAL/entities/Subscribe.entity";
import {
    GetSubscriptionsByFilterResponseItemDto
} from "../../modules/databaseInteraction/DTOs/subscriptionInteraction/GetSubscriptionsByFilter/GetSubscriptionsByFilterResponseItemDto";
import {
    PatchUpdateSubscriptionRequestDto
} from "../../modules/databaseInteraction/DTOs/subscriptionInteraction/PatchUpdateSubscription/PatchUpdateSubscriptionRequestDto";
import {DeleteRequesDtotBase} from "../../modules/databaseInteraction/DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/DeleteResponseDtoBase";

@Injectable()
export class SubscriptionService {
    constructor(@InjectRepository(Subscribe) private readonly subscriptionRepository: Repository<Subscribe>,) {
    }

    async getSubscriptionsByFilter(request: GetSubscriptionsByFilterRequestDto): Promise<GetSubscriptionsByFilterResponseDto> {
        let query = this.subscriptionRepository.createQueryBuilder('s')
            .where("1 = 1");

        if (request.id)
            query = query.andWhere('"s"."Id" = :id', {id: request.id});

        if (request.userId)
            query = query.andWhere('"s"."UserId" = :userId', {userId: request.userId})

        // @ts-ignore
        if (request.alreadyFinished && request.alreadyFinished == "true")
            query = query.andWhere('"s"."DateEnd" AT TIME ZONE \'UTC\' < CURRENT_DATE AT TIME ZONE \'UTC\'')
        else if (request.alreadyFinished)
            query = query.andWhere('"s"."DateEnd" AT TIME ZONE \'UTC\' > CURRENT_DATE AT TIME ZONE \'UTC\'')

        if (request.finishedAfter)
            query = query.andWhere('"s"."DateEnd" AT TIME ZONE \'UTC\' > :date AT TIME ZONE \'UTC\'',
                {date: request.finishedAfter});

        if (request.finishedBefore)
            query = query.andWhere('"s"."DateEnd" AT TIME ZONE \'UTC\' < :date AT TIME ZONE \'UTC\'',
                {date: request.finishedBefore});

        if (request.startedAfter)
            query = query.andWhere('"s"."DateStart" AT TIME ZONE \'UTC\' > :date AT TIME ZONE \'UTC\'',
                {date: request.startedAfter});

        if (request.startedBefore)
            query = query.andWhere('"s"."DateStart" AT TIME ZONE \'UTC\' < :date AT TIME ZONE \'UTC\'',
                {date: request.startedBefore});

        if (request.userRole)
            query = query
                .innerJoin('AspNetUserRoles', 'ur', '"ur"."UserId" = "s"."UserId"')
                .innerJoin('AspNetRoles', 'r', '"r"."Id" = "ur"."RoleId"')
                .andWhere('"r"."Name" = :roleName', {roleName: request.userRole});

        const totalCount = await query.getCount();

        query = query
            .skip(request.pageSize * (request.pageNumber - 1))
            .take(request.pageSize)
            .addSelect([
                '"s"."Id"',
                '"s"."UserId"',
                '"s"."DateStart"',
                '"s"."DateEnd"'
            ]);

        let resultFromDb = await query.getRawMany<Subscribe>();

        let result = new GetSubscriptionsByFilterResponseDto();
        result.totalCount = totalCount;

        result.subscriptions = resultFromDb.map(x => {
            let sub = new GetSubscriptionsByFilterResponseItemDto();
            sub.id = x.Id;
            sub.userId = x.UserId;
            sub.dateEnd = x.DateEnd;
            sub.dateStart = x.DateStart;
            return sub;
        });

        return result;
    }

    async deleteSubscription(request: DeleteRequesDtotBase)
        : Promise<DeleteResponseDtoBase> {
        let subscription = await this.subscriptionRepository.findOneByOrFail({"Id": request.id});

        if (!subscription)
            throw new NotFoundException("Subscription not found");

        await this.subscriptionRepository
            .createQueryBuilder()
            .delete()
            .from(Subscribe)
            .where("Id = :id", {id: request.id})
            .execute()

        return new DeleteResponseDtoBase(request.id);
    }

    async updateSubscription(request: PatchUpdateSubscriptionRequestDto)
        : Promise<void> {
        let subscription = await this.subscriptionRepository.findOneByOrFail({"Id": request.id});

        if (!subscription)
            throw new NotFoundException("Subscription not found");

        if (request.dateEnd) {
            request.dateEnd = new Date(request.dateEnd);
            subscription.DateEnd = request.dateEnd.toISOString();
        }

        if (request.dateStart) {
            request.dateStart = new Date(request.dateStart);
            subscription.DateStart = request.dateStart.toISOString();
        }

        if (request.userId)
            subscription.UserId = request.userId;

        await this.subscriptionRepository.save(subscription);
    }
}