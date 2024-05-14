export default class Song {
    id: string;
    name: string;
    authorNames: string[] = [];
    authorIds: string[] = [];
    imageId: string;
    duration: number;
    playsNumber: number;
    categoryId: string;

    constructor(id: string,
                name: string,
                authorNames: string[],
                authorIds: string[],
                imageId: string,
                duration: number,
                playsNumber: number,
                categoryId: string) {
        this.id = id;
        this.name = name;
        this.authorNames = authorNames;
        this.authorIds = authorIds;
        this.imageId = imageId;
        this.duration = duration;
        this.playsNumber = playsNumber;
        this.categoryId = categoryId;
    }
}