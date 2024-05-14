export class UpdateSongDto {
    id: string;
    name: string | null = null
    imageId: string | null = null;
    duration: number | null = null;
    addAuthorsIds: string[] | null = null;
    removeAuthorsIds: string[] | null = null;
    fileId: string | null = null;
    playsNumber: number | null = null;

    constructor(id: string,
                name: string | null = null,
                imageId: string | null = null,
                duration: number | null = null,
                addAuthorsIds: string[] | null = null,
                removeAuthorsIds: string[] | null = null,
                fileId: string | null = null,
                playsNumber: number | null = null) {
        this.id = id;
        this.name = name;
        this.imageId = imageId;
        this.duration = duration;
        this.addAuthorsIds = addAuthorsIds;
        this.removeAuthorsIds = removeAuthorsIds;
        this.fileId = fileId;
        this.playsNumber = playsNumber;
    }
}