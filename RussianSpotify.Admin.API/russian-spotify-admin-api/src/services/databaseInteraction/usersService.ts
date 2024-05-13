import {HttpException, Injectable, NotFoundException} from "@nestjs/common";
// @ts-ignore
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../DAL/entities/russianSpotifyDbEntities/User.entity";
import {Repository} from "typeorm";
import {
    GetUsersByFilterRequestDto
} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterRequestDto";
import {
    GetUsersByFilterResponseDto
} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterResponseDto";
import {
    GetUsersByFilterResponseItemDto
} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterResponseItemDto";
import {
    PatchUpdateUserRequestDto
} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/PatchUpdateUser/PatchUpdateUserRequestDto";
import {File} from "../../DAL/entities/russianSpotifyDbEntities/File.entity";
import {UserRole} from "../../DAL/entities/russianSpotifyDbEntities/UserRole.entity";
import {Role} from "../../DAL/entities/russianSpotifyDbEntities/Role.entity";
import {DeleteRequesDtotBase} from "../../modules/databaseInteraction/DTOs/common/DeleteRequesDtotBase";
import {DeleteResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/DeleteResponseDtoBase";
import {
    PostCreateUserRequestDto
} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/PostCreateUser/PostCreateUserRequestDto";
import {PostCreateResponseDtoBase} from "../../modules/databaseInteraction/DTOs/common/PostCreateResponseDtoBase";
import axios from "axios";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(File) private readonly fileRepository: Repository<File>,
                @InjectRepository(UserRole) private readonly userRolesRepository: Repository<UserRole>,
                @InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    }

    async createUser(request: PostCreateUserRequestDto): Promise<PostCreateResponseDtoBase> {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
        let response = await axios.post(`${process.env.RUSSIAN_SPOTIFY_API_BASE_URL}Auth/Register`, {
            userName: request.name,
            password: request.password,
            passwordConfirm: request.password,
            email: request.email,
            role: "Пользователь"
        });

        if(response.status != 200)
            throw new HttpException(response.data.message, response.status);

        let user = await this.userRepository.findOneByOrFail({Email: request.email});
        user.EmailConfirmed = true;
        await this.userRepository.save(user);

        let requestRole = await this.roleRepository
            .findOneByOrFail({NormalizedName: request.role.toUpperCase()});

        console.log(user.Id);
        console.log(requestRole);

        await this.userRolesRepository.createQueryBuilder()
            .update()
            .set({RoleId: requestRole.Id})
            .where("UserId = :userId", {userId: user.Id})
            .execute();

        return new PostCreateResponseDtoBase(user.Id);
    }

    async getUsersByFilter(request: GetUsersByFilterRequestDto): Promise<GetUsersByFilterResponseDto> {
        let query = this.userRepository.createQueryBuilder('u')
            .where("1 = 1");

        if (request.userName)
            query = query
                .andWhere('LOWER("u"."UserName") LIKE \':userName%\'',
                    {userName: request.userName.toLowerCase()});

        if (request.id)
            query = query
                .andWhere('LOWER("u"."Id") LIKE :id',
                    {id: request.id.toLowerCase()});

        if (request.email)
            query = query
                .andWhere('LOWER("u"."Email") LIKE \':email%\'',
                    {email: request.email.toLowerCase()});

        // @ts-ignore
        if (request.isNullRefresh && request.isNullRefresh == "true")
            query = query
                .andWhere('"u"."RefreshToken" IS null');
        // @ts-ignore
        else if (request.isNullRefresh && request.isNullRefresh == "false")
            query = query
                .andWhere('"u"."RefreshToken" IS NOT null');

        // @ts-ignore
        if (request.isNullAccess && request.isNullAccess == "true")
            query = query
                .andWhere('"u"."AccessToken" IS null');
        // @ts-ignore
        else if (request.isNullAccess && request.isNullAccess == "false")
            query = query
                .andWhere('"u"."AccessToken" IS NOT null');

        // @ts-ignore
        if (request.isExpiredRefresh && request.isExpiredRefresh == "true")
            query = query
                .andWhere('"u"."RefreshToken" IS NOT null')
                .andWhere('"u"."RefreshTokenExpiryTime" AT TIME ZONE \'UTC\' < CURRENT_DATE AT TIME ZONE \'UTC\'');
        // @ts-ignore
        else if (request.isExpiredRefresh && request.isExpiredRefresh == "false")
            query = query
                .andWhere('"u"."RefreshToken" IS NOT null')
                .andWhere('"u"."RefreshTokenExpiryTime" AT TIME ZONE \'UTC\' > CURRENT_DATE AT TIME ZONE \'UTC\'');

        if (request.isEmailConfirmed)
            query = query
                .andWhere('"u"."EmailConfirmed" = :isEmailConfirmed',
                    {isEmailConfirmed: request.isEmailConfirmed});

        query = query
            .innerJoin('AspNetUserRoles', 'ur', '"u"."Id" = "ur"."UserId"')
            .innerJoin('AspNetRoles', 'r', '"ur"."RoleId" = "r"."Id"')

        const totalCount = await query.getCount();

        query = query
            .skip(request.pageSize * (request.pageNumber - 1))
            .take(request.pageSize)
            .addSelect([
                '"u"."Id"',
                '"u"."UserName"',
                '"u"."Email"',
                '"u"."EmailConfirmed"',
                '"u"."AccessToken"',
                '"u"."RefreshToken"',
                '"u"."RefreshTokenExpiryTime"',
                '"u"."UserPhotoId"',
                '"r"."Name" AS "Role"',
            ]);

        let resultDbItems = await query.execute();

        const responseItems = resultDbItems.map(x => {
            let item = new GetUsersByFilterResponseItemDto();
            item.id = x.Id;
            item.email = x.Email;
            item.accessToken = x.AccessToken;
            item.refreshToken = x.RefreshToken;
            item.name = x.UserName;
            item.imageId = x.UserPhotoId;
            item.refreshTokenExpires = x.RefreshTokenExpiryTime;
            item.emailConfirmed = x.EmailConfirmed;
            item.role = x.Role;
            return item;
        });

        let result = new GetUsersByFilterResponseDto();
        result.totalCount = totalCount;
        result.users = responseItems;

        return result;
    }

    async deleteUser(request: DeleteRequesDtotBase): Promise<DeleteResponseDtoBase> {
        let user = await this.userRepository.findOneByOrFail({"Id": request.id});

        if (!user)
            throw new NotFoundException("User not found");

        await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("Id = :id", {id: request.id})
            .execute()

        return new DeleteResponseDtoBase(request.id);
    }

    async updateUser(request: PatchUpdateUserRequestDto): Promise<void> {
        let user = await this.userRepository.findOneByOrFail({"Id": request.id});

        if (!user)
            throw new NotFoundException("User not found");

        if (request.emailConfirmed)
            user.EmailConfirmed = request.emailConfirmed;

        console.log(request)
        if (request.userName) {
            console.log("true, bro");
            user.UserName = request.userName;
            user.NormalizedUserName = request.userName.toUpperCase();
        }

        let imageFileId = await this.fileRepository.findOneByOrFail({"Id": request.userPhotoId})
        if (request.userPhotoId && imageFileId)
            user.UserPhotoId = request.userPhotoId;
        else if (!imageFileId && request.userPhotoId != undefined)
            throw new NotFoundException("Image file not found");

        if (request.role) {
            let role = await this.roleRepository.findOneByOrFail({"NormalizedName": request.userName.toUpperCase()});
            let currentRole = await this.userRolesRepository.findOneByOrFail({"UserId": request.id});
            currentRole.RoleId = role.Id;
            await this.userRolesRepository.save(currentRole);
        }

        await this.userRepository.save(user);
    }
}