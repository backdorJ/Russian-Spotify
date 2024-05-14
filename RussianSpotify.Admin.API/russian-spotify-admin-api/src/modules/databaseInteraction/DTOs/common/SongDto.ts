export class SongDto{
    id: string;
    name: string;
    authorNames: string[] = [];
    authorIds: string[] = [];
    imageId: string;
    duration: number;
    playsNumber: number;
    categoryId: string;
}
