import {Body, Controller, Delete, Get, Inject, Patch, Query} from "@nestjs/common";
import {
    GetSubscriptionsByFilterRequestDto
} from "../DTOs/subscriptionInteraction/GetSubscriptionsByFilter/GetSubscriptionsByFilterRequestDto";
import {
    GetSubscriptionsByFilterResponseDto
} from "../DTOs/subscriptionInteraction/GetSubscriptionsByFilter/GetSubscriptionsByFilterResponseDto";
import {SubscriptionService} from "../../../services/databaseInteraction/subscriptionService";
import {ApiTags} from "@nestjs/swagger";
import {
    DeleteSubscriptionRequestDto
} from "../DTOs/subscriptionInteraction/DeleteSubscription/DeleteSubscriptionRequestDto";
import {
    DeleteSubscriptionResponseDto
} from "../DTOs/subscriptionInteraction/DeleteSubscription/DeleteSubscriptionResponseDto";
import {
    PatchUpdateSubscriptionRequestDto
} from "../DTOs/subscriptionInteraction/PatchUpdateSubscription/PatchUpdateSubscriptionRequestDto";

@ApiTags("SubscriptionInteraction")
@Controller('api/SubscriptionInteraction')
export class SubscriptionInteractionController {
    constructor(@Inject(SubscriptionService) private readonly subscriptionService: SubscriptionService) {}

    @Get("GetSubscriptionsByFilter")
    async getSubscriptions(@Query() getSubscriptionByFilterRequestDto: GetSubscriptionsByFilterRequestDto)
        : Promise<GetSubscriptionsByFilterResponseDto> {
        return await this.subscriptionService.getSubscriptionsByFilter(getSubscriptionByFilterRequestDto);
    }

    @Delete("DeleteSubscription")
    async deleteSubscription(@Body() deleteSubscriptionRequestDto: DeleteSubscriptionRequestDto)
        : Promise<DeleteSubscriptionResponseDto> {
        return await this.subscriptionService.deleteSubscription(deleteSubscriptionRequestDto);
    }

    @Patch("UpdateSubscription")
    async updateSubscription(@Body() patchUpdateSubscriptionRequestDto: PatchUpdateSubscriptionRequestDto)
        : Promise<void>{
        await this.subscriptionService.updateSubscription(patchUpdateSubscriptionRequestDto);
    }
}