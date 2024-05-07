import {Body, Controller, Delete, Get, Inject, Patch, Query} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import { BucketService } from "src/services/databaseInteraction/bucketService";
import {GetBucketsByFilterResponseDto} from "../DTOs/bucketInteraction/GetBucketsByFilter/GetBucketsByFilterResponseDto";
import {GetBucketsByFilterRequestDto} from "../DTOs/bucketInteraction/GetBucketsByFilter/GetBucketsByFilterRequestDto";
import {DeleteBucketRequestDto} from "../DTOs/bucketInteraction/DeleteBucket/DeleteBucketRequestDto";
import {DeleteBucketResponseDto} from "../DTOs/bucketInteraction/DeleteBucket/DeleteBucketResponseDto";
import {PatchUpdateBucketRequestDto} from "../DTOs/bucketInteraction/PatchUpdateBucket/PatchUpdateBucketRequestDto";

@ApiTags("BucketInteraction")
@Controller("api/BucketInteraction")
export class BucketInteractionController {
    constructor(@Inject(BucketService) private readonly bucketService: BucketService) {}

    @Get("GetBucketsByFilter")
    async getBuckets(@Query() getBucketsRequestDto: GetBucketsByFilterRequestDto)
        : Promise<GetBucketsByFilterResponseDto> {
        return await this.bucketService.getBucketsByFilter(getBucketsRequestDto);
    }

    @Delete("DeleteBucket")
    async deleteBucket(@Body() deleteBucketRequestDto: DeleteBucketRequestDto) : Promise<DeleteBucketResponseDto> {
        return await this.bucketService.deleteBucket(deleteBucketRequestDto);
    }

    @Patch("UpdateBucket")
    async updateBucket(@Body() patchUpdateBucketRequestDto: PatchUpdateBucketRequestDto) : Promise<void>{
        await this.bucketService.updateBucket(patchUpdateBucketRequestDto);
    }
}