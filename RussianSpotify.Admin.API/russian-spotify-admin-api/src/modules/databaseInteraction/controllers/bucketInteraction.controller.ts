import {Body, Controller, Delete, Get, Inject, Patch, Post, Query} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import { BucketService } from "src/services/databaseInteraction/bucketService";
import {GetBucketsByFilterResponseDto} from "../DTOs/bucketInteraction/GetBucketsByFilter/GetBucketsByFilterResponseDto";
import {GetBucketsByFilterRequestDto} from "../DTOs/bucketInteraction/GetBucketsByFilter/GetBucketsByFilterRequestDto";
import {PatchUpdateBucketRequestDto} from "../DTOs/bucketInteraction/PatchUpdateBucket/PatchUpdateBucketRequestDto";
import {DeleteRequesDtotBase} from "../DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../DTOs/common/DeleteResponseDtoBase";
import {PostCreateBucketRequestDto} from "../DTOs/bucketInteraction/PostCreateBucket/PostCreateBucketRequestDto";
import {PostCreateResponseDtoBase} from "../DTOs/common/PostCreateResponseDtoBase";

@ApiTags("BucketInteraction")
@Controller("api/BucketInteraction")
export class BucketInteractionController {
    constructor(@Inject(BucketService) private readonly bucketService: BucketService) {}

    @Post("CreateBucket")
    async createBucket(@Body() postCreateBucketRequestDto: PostCreateBucketRequestDto)
        : Promise<PostCreateResponseDtoBase> {
        return await this.bucketService.createBucket(postCreateBucketRequestDto);
    }

    @Get("GetBucketsByFilter")
    async getBuckets(@Query() getBucketsRequestDto: GetBucketsByFilterRequestDto)
        : Promise<GetBucketsByFilterResponseDto> {
        return await this.bucketService.getBucketsByFilter(getBucketsRequestDto);
    }

    @Delete("DeleteBucket")
    async deleteBucket(@Body() deleteBucketRequestDto: DeleteRequesDtotBase) : Promise<DeleteResponseDtoBase> {
        return await this.bucketService.deleteBucket(deleteBucketRequestDto);
    }

    @Patch("UpdateBucket")
    async updateBucket(@Body() patchUpdateBucketRequestDto: PatchUpdateBucketRequestDto) : Promise<void>{
        await this.bucketService.updateBucket(patchUpdateBucketRequestDto);
    }
}