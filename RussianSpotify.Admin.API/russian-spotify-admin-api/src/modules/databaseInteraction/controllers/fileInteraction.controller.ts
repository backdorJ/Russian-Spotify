import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException, HttpStatus,
    Inject,
    Post,
    Query,
    Req,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {FileService} from "../../../services/databaseInteraction/fileService";
import {GetFilesByFilterRequestDto} from "../DTOs/fileInteraction/GetFilesByFilter/GetFilesByFilterRequestDto";
import {GetFilesByFilterResponseDto} from "../DTOs/fileInteraction/GetFilesByFilter/GetFilesByFilterResponseDto";
import {DeleteRequesDtotBase} from "../DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../DTOs/common/DeleteResponseDtoBase";
import {PostCreateResponseDtoBase} from "../DTOs/common/PostCreateResponseDtoBase";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileExtender} from "../../../interceptors/FileInterceptor";

@ApiBearerAuth()
@ApiTags("FileInteraction")
@Controller("api/FileInteraction")
export class FileInteractionController {
    constructor(@Inject(FileService) private readonly fileService: FileService) {
    }

    @ApiOperation({description: "Создание файла через апи ASP.NET Core"})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileExtender)
    @UseInterceptors(FileInterceptor('files'))
    @ApiConsumes('multipart/form-data')
    @Post("CreateFile")
    async createFile(@UploadedFile('file') file: File, @Req() req: Request):
        Promise<PostCreateResponseDtoBase> {
        let jwt = req.headers["authorization"];
        return await this.fileService.createFile(file, jwt);
    }

    @ApiOperation({description: "Отдаёт файлы по фильтру"})
    @Get("GetFilesByFilter")
    async getFiles(@Query() getFilesByFilterRequestDto: GetFilesByFilterRequestDto)
        : Promise<GetFilesByFilterResponseDto> {
        return await this.fileService.getFilesByFilter(getFilesByFilterRequestDto);
    }

    @ApiOperation({description: "Удаляет файл"})
    @Delete("DeleteFile")
    async deleteFile(@Body() deleteFileRequestDto: DeleteRequesDtotBase, @Req() req): Promise<DeleteResponseDtoBase> {
        let jwt = req.headers.authorization;
        return await this.fileService.deleteFile(deleteFileRequestDto, jwt);
    }
}