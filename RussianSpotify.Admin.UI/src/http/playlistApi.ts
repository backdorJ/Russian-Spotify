import {MessageWithValue} from "../utils/dto/messageWithValue";
import DeleteDto from "../utils/dto/deleteDto";
import GetPlaylistsByFilterDto from "../utils/dto/playlist/getPlaylistsByFilterDto";
import CreatePlaylistDto from "../utils/dto/playlist/createPlaylistDto";
import {$authAdminHost} from "./index";
import UpdatePlaylistDto from "../utils/dto/playlist/updatePlaylistDto";

export const getPlaylistsByFilter = async (pageNumber: number, pageSize: number,
                                           isAlbum: boolean | null = null,
                                           id: string | null = null,
                                           name: string | null = null,
                                           authorId: string | null = null,
                                           authorName: string | null = null) => {
    const dto = new GetPlaylistsByFilterDto(pageNumber, pageSize, id, authorId, authorName, name, isAlbum);
    const response = await $authAdminHost.get('api/PlaylistInteraction/GetPlaylistsByFilter', {params: {...dto}})
    return (response.status !== 200)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('', response.data.playlists)
}

export const createPlaylist = async (name: string, imageId: string | null = null, authorId: string, isAlbum: boolean) => {
    const dto = new CreatePlaylistDto(name, imageId, authorId, isAlbum);
    const response = await $authAdminHost.post('api/PlaylistInteraction/CreatePlaylist', dto)
    return (response.status !== 201)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('Плейлист создан успешно')
}

export const deletePlaylist = async (id: string) => {
    const dto = new DeleteDto(id)
    const response = await $authAdminHost.delete('api/PlaylistInteraction/DeletePlaylist', {data: dto})
    return response.status === 200
        ? new MessageWithValue('Плейлист был удалён')
        : new MessageWithValue(response.data.message)
}

export const updatePlaylist = async (id: string, name: string, isAlbum: boolean, addSongsIds: string[], removeSongsIds: string[], authorId: string, releaseDate: Date) => {
    const dto = new UpdatePlaylistDto(id, name, isAlbum, addSongsIds, removeSongsIds, authorId, releaseDate)
    const response = await $authAdminHost.patch('api/PlaylistInteraction/UpdatePlaylist', dto)
    return response.status === 200
        ? new MessageWithValue('Плейлист успешно обновлён')
        : new MessageWithValue(response.data.message)
}