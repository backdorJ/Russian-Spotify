import {$authAdminHost} from "./index";
import {MessageWithValue} from "../utils/dto/messageWithValue";
import DeleteDto from "../utils/dto/deleteDto";
import GetSubcriptionsByFilterDto from "../utils/dto/subscription/getSubcriptionsByFilterDto";
import {UpdateSubcriptionDto} from "../utils/dto/subscription/updateSubcriptionDto";
import {CreateSubcriptionDto} from "../utils/dto/subscription/createSubcriptionDto";

export const getSubscriptionsByFilter = async (pageNumber: number,
                                               pageSize: number,
                                               alreadyFinished: boolean | null = null,
                                               startedAfter: Date | null = null,
                                               finishedAfter: Date | null = null,
                                               finishedBefore: Date | null = null,
                                               startedBefore: Date | null = null,
                                               id: string | null = null,
                                               userId: string | null = null,
                                               userRole: string | null = null) => {
    const dto = new GetSubcriptionsByFilterDto(pageNumber, pageSize, userId, id, startedAfter, finishedAfter, finishedBefore, startedBefore, userRole, alreadyFinished);
    const response = await $authAdminHost.get('api/SubscriptionInteraction/GetSubscriptionsByFilter', {params: {...dto}})
    return (response.status !== 200)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('', response.data.subscriptions)
}

export const createSubscription = async (dateStart: Date, dateEnd: Date, userId: string) => {
    const dto = new CreateSubcriptionDto(dateStart, dateEnd, userId)
    const response = await $authAdminHost.post('api/SubscriptionInteraction/CreateSubscription', dto)

    return (response.status !== 201)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('Подписка создана успешно')
}

export const deleteSubcription = async (id: string) => {
    const dto = new DeleteDto(id)
    const response = await $authAdminHost.delete('api/SubscriptionInteraction/DeleteSubscription', {data: dto})
    return response.status === 200
        ? new MessageWithValue('Подписка была удалена')
        : new MessageWithValue(response.data.message)
}

export const updateSubscription = async (id: string, dateStart: Date, dateEnd: Date) => {
    const dto = new UpdateSubcriptionDto(id, dateStart, dateEnd)
    const response = await $authAdminHost.patch('api/SubscriptionInteraction/UpdateSubscription', dto)

    return response.status === 200
        ? new MessageWithValue('Подписка успешно обновлена')
        : new MessageWithValue(response.data.message)
}