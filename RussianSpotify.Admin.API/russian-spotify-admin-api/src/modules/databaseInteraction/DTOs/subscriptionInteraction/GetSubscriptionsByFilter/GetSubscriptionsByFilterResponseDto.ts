import {GetSubscriptionsByFilterResponseItemDto} from "./GetSubscriptionsByFilterResponseItemDto";

export class GetSubscriptionsByFilterResponseDto {
    subscriptions: GetSubscriptionsByFilterResponseItemDto[];
    totalCount: number;
}