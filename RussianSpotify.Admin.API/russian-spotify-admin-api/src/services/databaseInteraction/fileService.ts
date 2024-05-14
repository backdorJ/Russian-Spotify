import {HttpException, Inject, Injectable, NotFoundException} from "@nestjs/common";
// @ts-ignore
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    GetFilesByFilterRequestDto
} from "../../modules/databaseInteraction/DTOs/fileInteraction/GetFilesByFilter/GetFilesByFilterRequestDto";
import {
    GetFilesByFilterResponseDto
} from "../../modules/databaseInteraction/DTOs/fileInteraction/GetFilesByFilter/GetFilesByFilterResponseDto";
import {File as Files} from "../../DAL/entities/russianSpotifyDbEntities/File.entity";
import {
    GetFilesByFilterResponseItemDto
} from "../../modules/databaseInteraction/DTOs/fileInteraction/GetFilesByFilter/GetFilesByFilterResponseItemDto";
import {DeleteRequesDtotBase} from "../../modules/databaseInteraction/DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/DeleteResponseDtoBase";
import {HttpService} from "@nestjs/axios";
import * as process from "node:process";
import {PostCreateResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/PostCreateResponseDtoBase";
import axios from "axios";

@Injectable()
export class FileService {
    constructor(@InjectRepository(Files) private fileRepository: Repository<Files>,
                @Inject(HttpService) private readonly httpService: HttpService) {
    }

    async createFile(file: File, jwt: string): Promise<PostCreateResponseDtoBase> {
        let formData = new FormData();
        let blob = new Blob([file], {type: file.type});
        formData.append("files", blob, file.name);

        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
        let response = await axios.post(`${process.env.RUSSIAN_SPOTIFY_API_BASE_URL}File/`,
            formData,
            {
                headers: {"Authorization": jwt, 'Content-Type': 'multipart/form-data', "Content-Length": file.size},
            },
        );

        if (response.status != 200)
            throw new HttpException("Cannot upload file", response.status);

        return new PostCreateResponseDtoBase(response.data.fileNameToIds[0].fileId);
    }

    async getFilesByFilter(request: GetFilesByFilterRequestDto): Promise<GetFilesByFilterResponseDto> {
        let query = this.fileRepository.createQueryBuilder("f")
            .where("1 = 1");

        // @ts-ignore
        if (request.isImageFile && request.isImageFile == "true" || request.isSongFile && request.isSongFile == "false")
            query = query.andWhere('"f"."ContentType" LIKE \'image/%\'');
        // @ts-ignore
        else if (request.isImageFile && request.isImageFile == "false" || request.isSongFile && request.isSongFile == "true")
            query = query.andWhere('"f"."ContentType" LIKE \'audio/%\'');

        if (request.address)
            query = query.andWhere('"f"."Address" LIKE \':address%\'', {address: request.address});

        if (request.id)
            query = query.andWhere('"f"."Id" = :id', {id: request.id});

        if (request.name)
            query = query.andWhere('LOWER("f"."FileName") LIKE \'name%\'',
                {name: request.name.toLowerCase()});

        if (request.sizeLessThen)
            query = query.andWhere('"f"."Size" < :size', {size: request.sizeLessThen});

        if (request.sizeMoreThen)
            query = query.andWhere('"f"."Size" > :size', {size: request.sizeMoreThen});

        // @ts-ignore
        if (request.orderBySize && request.orderBySize == "true")
            query = query.addOrderBy('"f"."Size"', "ASC")
        else if (request.orderBySize)
            query = query.addOrderBy('"f"."Size"', "DESC")

        query = query.addSelect([
            '"f"."Id"',
            '"f"."Address"',
            '"f"."Size"',
            '"f"."FileName"',
            '"f"."ContentType"',
            '"f"."UserId"',
            '"f"."SongId"',
        ])

        const totalCount = await query.getCount();

        query = query
            .skip(request.pageSize * (request.pageNumber - 1))
            .take(request.pageSize);
        
        const resultFromDb = await query.execute();
        

        const result = new GetFilesByFilterResponseDto();
        result.totalCount = totalCount;
        result.files = resultFromDb.map(x => {
            let item = new GetFilesByFilterResponseItemDto();
            item.id = x.Id;
            item.address = x.Address;
            item.size = x.Size;
            item.name = x.FileName;
            item.songId = x.SongId;
            item.userId = x.UserId;
            item.contentType = x.ContentType;
            return item;
        });

        return result;
    }

    async deleteFile(request: DeleteRequesDtotBase, jwt: string): Promise<DeleteResponseDtoBase> {
        let file = await this.fileRepository.findOneByOrFail({"Id": request.id});

        if (!file)
            throw new NotFoundException("File not found");

        let response =
            await this.httpService
                .delete(`${process.env.RUSSIAN_SPOTIFY_API_BASE_URL}File/Delete?FileId=${request.id}`, {
                    headers: {"Authorization": jwt}
                }).toPromise();

        if (response.status != 200)
            throw new HttpException("Cannot delete file with id", response.status);

        return new DeleteResponseDtoBase(request.id);
    }
}