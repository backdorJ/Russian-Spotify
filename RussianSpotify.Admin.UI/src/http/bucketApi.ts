import {MessageWithValue} from "../utils/dto/messageWithValue";
import DeleteDto from "../utils/dto/deleteDto";
import {$authAdminHost} from "./index";
import GetBucketsByFilterDto from "../utils/dto/buckets/getBucketsByFilterDto";
import CreateBucketDto from "../utils/dto/buckets/createBucketDto";
import UpdateBucketDto from "../utils/dto/buckets/updateBucketDto";

export const getBucketsByFilter = async (id: string | null = null,
                                         userId: string | null = null) => {
    const dto = new GetBucketsByFilterDto(id, userId);
    const response = await $authAdminHost.get('api/BucketInteraction/GetBucketsByFilter', {params: {...dto}})
    return (response.status !== 200)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('', response.data)
}

export const createBucket = async (userId: string) => {
    const dto = new CreateBucketDto(userId);
    const response = await $authAdminHost.post('api/BucketInteraction/CreateBucket', dto)
    return (response.status !== 201)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('Корзина создана успешно')
}

export const deleteBucket = async (id: string) => {
    const dto = new DeleteDto(id)
    const response = await $authAdminHost.delete('api/BucketInteraction/DeleteBucket', {data: dto})
    return response.status === 200
        ? new MessageWithValue('Корзина был удалена')
        : new MessageWithValue(response.data.message)
}

export const updateBucket = async (id: string,
                                   addSongsIds: string[] | null = null,
                                   removeSongsIds: string[] | null = null) => {
    const dto = new UpdateBucketDto(id, addSongsIds, removeSongsIds)
    const response = await $authAdminHost.patch('api/BucketInteraction/UpdateBucket', dto)
    return response.status === 200
        ? new MessageWithValue('Корзина успешно обновлена')
        : new MessageWithValue(response.data.message)
}