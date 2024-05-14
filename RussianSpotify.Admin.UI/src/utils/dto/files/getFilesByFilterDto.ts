export default class GetFilesByFilterDto {
    id: string | null = null;
    name: string | null = null;
    isSongFile: boolean | null;
    isImageFile: boolean | null;
    address: string | null = null;
    sizeMoreThen: number | null = null;
    sizeLessThen: number | null = null;
    orderBySize: boolean | null = null;
    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number,
                pageSize: number,
                id: string | null = null,
                name: string | null = null,
                isSongFile: boolean | null = null,
                isImageFile: boolean | null = null,
                address: string | null = null,
                sizeMoreThen: number | null = null,
                sizeLessThen: number | null = null,
                orderBySize: boolean | null = null) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.id = id;
        this.name = name;
        this.isSongFile = isSongFile;
        this.isImageFile = isImageFile;
        this.address = address;
        this.sizeMoreThen = sizeMoreThen;
        this.sizeLessThen = sizeLessThen;
        this.orderBySize = orderBySize;
    }
}