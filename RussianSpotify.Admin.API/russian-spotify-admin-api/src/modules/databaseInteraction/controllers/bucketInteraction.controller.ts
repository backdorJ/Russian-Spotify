import {Body, Controller, Delete, Get, Inject, Patch, Post, Query} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import { BucketService } from "src/services/databaseInteraction/bucketService";
import {GetBucketsByFilterResponseDto} from "../DTOs/bucketInteraction/GetBucketsByFilter/GetBucketsByFilterResponseDto";
import {GetBucketsByFilterRequestDto} from "../DTOs/bucketInteraction/GetBucketsByFilter/GetBucketsByFilterRequestDto";
import {PatchUpdateBucketRequestDto} from "../DTOs/bucketInteraction/PatchUpdateBucket/PatchUpdateBucketRequestDto";
import {DeleteRequesDtotBase} from "../DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../DTOs/common/DeleteResponseDtoBase";
import {PostCreateBucketRequestDto} from "../DTOs/bucketInteraction/PostCreateBucket/PostCreateBucketRequestDto";
import {PostCreateResponseDtoBase} from "../DTOs/common/PostCreateResponseDtoBase";

@ApiBearerAuth()
@ApiTags("BucketInteraction")
@Controller("api/BucketInteraction")
export class BucketInteractionController {
    constructor(@Inject(BucketService) private readonly bucketService: BucketService) {}

    @ApiOperation({description: "Создаёт бакет с любимыми песнями для пользователя"})
    @Post("CreateBucket")
    async createBucket(@Body() postCreateBucketRequestDto: PostCreateBucketRequestDto)
        : Promise<PostCreateResponseDtoBase> {
        return await this.bucketService.createBucket(postCreateBucketRequestDto);
    }

    @ApiOperation({description: "Отдаёт бакеты по фильтрации"})
    @Get("GetBucketsByFilter")
    async getBuckets(@Query() getBucketsRequestDto: GetBucketsByFilterRequestDto)
        : Promise<GetBucketsByFilterResponseDto> {
        return await this.bucketService.getBucketsByFilter(getBucketsRequestDto);
    }

    @ApiOperation({description: "Удаляет бакет по id"})
    @Delete("DeleteBucket")
    async deleteBucket(@Body() deleteBucketRequestDto: DeleteRequesDtotBase) : Promise<DeleteResponseDtoBase> {
        return await this.bucketService.deleteBucket(deleteBucketRequestDto);
    }

    @ApiOperation({description: "Обновляет бакет, добавление песен в бакет или их удаление"})
    @Patch("UpdateBucket")
    async updateBucket(@Body() patchUpdateBucketRequestDto: PatchUpdateBucketRequestDto) : Promise<void>{
        await this.bucketService.updateBucket(patchUpdateBucketRequestDto);
    }
}