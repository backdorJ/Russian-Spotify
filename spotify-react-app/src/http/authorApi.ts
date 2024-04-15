import {$authHost} from "./index";
import Author from "../models/Author";
import AlbumLittle from "../models/AlbumLittle";


export const getAuthorsByFilter = async (filter: string, playlistCount: number, pageNumber: number, pageSize: number) => {
    const response = await $authHost.get('api/Author/GetAuthorsByFilter?' +
        new URLSearchParams({
            filterName: 'AuthorName',
            filterValue: filter,
            playlistCount: '2',
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString()
        }))

    return response.data.entities.map((i: {
        authorId: string;
        authorName: string;
        imageId: string;
        albums: any[];
    }) => Author.init(
        i.authorId,
        i.authorName,
        i.imageId,
        i.albums.map(e => AlbumLittle.init(e.playlistId, e.playlistName))))
}

export const getAuthorsShuffled = async (pageNumber: number, pageSize: number) => {
    const response = await $authHost.get('api/Author/GetAuthorsByFilter?' +
        new URLSearchParams({
            filterName: 'AuthorShuffled',
            filterValue: 'smth',
            playlistCount: '0',
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString()
        }))

    return response.data.entities.map((i: {
        authorId: string;
        authorName: string;
        imageId: string;
        albums: any[];
    }) => Author.init(
        i.authorId,
        i.authorName,
        i.imageId,
        i.albums.map(e => AlbumLittle.init(e.playlistId, e.playlistName))))
}