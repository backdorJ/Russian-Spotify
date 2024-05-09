import {Body, Controller, Delete, Get, Inject, Patch, Post, Query} from "@nestjs/common";
import {
    GetSubscriptionsByFilterRequestDto
} from "../DTOs/subscriptionInteraction/GetSubscriptionsByFilter/GetSubscriptionsByFilterRequestDto";
import {
    GetSubscriptionsByFilterResponseDto
} from "../DTOs/subscriptionInteraction/GetSubscriptionsByFilter/GetSubscriptionsByFilterResponseDto";
import {SubscriptionService} from "../../../services/databaseInteraction/subscriptionService";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {
    PatchUpdateSubscriptionRequestDto
} from "../DTOs/subscriptionInteraction/PatchUpdateSubscription/PatchUpdateSubscriptionRequestDto";
import {DeleteRequesDtotBase} from "../DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../DTOs/common/DeleteResponseDtoBase";
import {
    PostCreateSubscriptionRequestDto
} from "../DTOs/subscriptionInteraction/PostCreateSubscription/PostCreateSubscriptionRequestDto";
import {PostCreateResponseDtoBase} from "../DTOs/common/PostCreateResponseDtoBase";

@ApiBearerAuth()
@ApiTags("SubscriptionInteraction")
@Controller('api/SubscriptionInteraction')
export class SubscriptionInteractionController {
    constructor(@Inject(SubscriptionService) private readonly subscriptionService: SubscriptionService) {}

    @Post("CreateSubscription")
    async createSubscription(@Body() postCreateSubscriptionRequestDto: PostCreateSubscriptionRequestDto)
        : Promise<PostCreateResponseDtoBase> {
        return await this.subscriptionService.createSubscription(postCreateSubscriptionRequestDto);
    }

    @Get("GetSubscriptionsByFilter")
    async getSubscriptions(@Query() getSubscriptionByFilterRequestDto: GetSubscriptionsByFilterRequestDto)
        : Promise<GetSubscriptionsByFilterResponseDto> {
        return await this.subscriptionService.getSubscriptionsByFilter(getSubscriptionByFilterRequestDto);
    }

    @Delete("DeleteSubscription")
    async deleteSubscription(@Body() deleteSubscriptionRequestDto: DeleteRequesDtotBase)
        : Promise<DeleteResponseDtoBase> {
        return await this.subscriptionService.deleteSubscription(deleteSubscriptionRequestDto);
    }

    @Patch("UpdateSubscription")
    async updateSubscription(@Body() patchUpdateSubscriptionRequestDto: PatchUpdateSubscriptionRequestDto)
        : Promise<void>{
        await this.subscriptionService.updateSubscription(patchUpdateSubscriptionRequestDto);
    }
}