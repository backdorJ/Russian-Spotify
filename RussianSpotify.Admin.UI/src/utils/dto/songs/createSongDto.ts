export default class CreateSongDto {
    name: string;
    duration: number;
    imageId: string | null = null;
    categoryId: string | null = null

    constructor(name: string,
                duration: number,
                imageId: string | null = null,
                categoryId: string | null = null) {
        this.name = name;
        this.duration = duration;
        this.imageId = imageId;
        this.categoryId = categoryId;
    }
}