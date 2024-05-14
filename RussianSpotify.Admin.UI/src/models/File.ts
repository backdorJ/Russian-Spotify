export default class File {
    id: string;
    address: string;
    size: number;
    name: string;
    contentType: string;
    songId: string | null;
    userId: string | null;

    constructor(id: string,
                address: string,
                size: number,
                name: string,
                contentType: string,
                songId: string | null,
                userId: string | null) {
        this.id = id;
        this.address = address;
        this.size = size;
        this.name = name;
        this.contentType = contentType;
        this.songId = songId;
        this.userId = userId;
    }
}