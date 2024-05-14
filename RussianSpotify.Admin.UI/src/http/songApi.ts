import {$authAdminHost} from "./index";
import {MessageWithValue} from "../utils/dto/messageWithValue";
import DeleteDto from "../utils/dto/deleteDto";
import {GetSongsByFilterDto} from "../utils/dto/songs/getSongsByFilterDto";
import {UpdateSongDto} from "../utils/dto/songs/updateSongDto";
import CreateSongDto from "../utils/dto/songs/createSongDto";

export const getSongsByFilter = async (pageNumber: number, pageSize: number, orderByPlaysNumber: boolean | null = null,
                                       songId: string | null = null,  songName: string | null = null, 
                                       authorsIds: string[] | null = null, moreThenPlaysNumber: number | null = null,
                                       lessThenPlaysNumber: number | null = null, categoryId: string | null = null,
                                       moreThenDuration: number | null = null, lessThenDuration: number | null = null,
                                       albumId: string | null = null) => {
    const dto = new GetSongsByFilterDto(pageNumber, pageSize, authorsIds, songName, songId, moreThenPlaysNumber, lessThenPlaysNumber, orderByPlaysNumber, categoryId, moreThenDuration, lessThenDuration, albumId);
    const response = await $authAdminHost.get('api/SongInteraction/GetSongsByFilter', {params: {...dto}})
    return (response.status !== 200)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('', response.data.songs)
}

export const createSong = async (name: string, duration: number, imageId: string | null = null, categoryId: string) => {
    const dto = new CreateSongDto(name, duration, imageId, categoryId);
    const response = await $authAdminHost.post('api/SongInteraction/CreateSong', dto)
    return (response.status !== 201)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue(`Песня создана успешно\nЕё ID:\n${response.data.id}`)
}

export const deleteSong = async (id: string) => {
    const dto = new DeleteDto(id)
    const response = await $authAdminHost.delete('api/SongInteraction/DeleteSong', {data: dto})
    return response.status === 200
        ? new MessageWithValue('Подписка была удалена')
        : new MessageWithValue(response.data.message)
}

export const updateSong = async (id: string, name: string, imageId: string | null, duration: number, addAuthorsIds: string[], removeAuthorsId: string[], fileId: string | null, playNumber: number) => {
    if (!imageId)
        imageId = null
    if (!fileId)
        fileId = null
    const dto = new UpdateSongDto(id, name, imageId, duration, addAuthorsIds, removeAuthorsId, fileId, playNumber)
    const response = await $authAdminHost.patch('api/SongInteraction/UpdateSong', dto)
    return response.status === 200
        ? new MessageWithValue('Песня успешно изменена')
        : new MessageWithValue(response.data.message)
}