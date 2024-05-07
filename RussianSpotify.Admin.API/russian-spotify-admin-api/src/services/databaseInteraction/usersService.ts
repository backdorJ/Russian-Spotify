import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../DAL/entities/User.entity";
import {Repository} from "typeorm";
import {GetUsersByFilterRequestDto} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterRequestDto";
import {GetUsersByFilterResponseDto} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterResponseDto";
import {GetUsersByFilterResponseItemDto} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/GetUsersByFilter/GetUsersByFilterResponseItemDto";
import {DeleteUserRequestDto} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/DeleteUser/DeleteUserRequestDto";
import {PatchUpdateUserRequestDto} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/PatchUpdateUser/PatchUpdateUserRequestDto";
import {DeleteUserResponseDto} from "../../modules/databaseInteraction/DTOs/userInteractionDTOs/DeleteUser/DeleteUserResponseDto";
import {File} from "../../DAL/entities/File.entity";
import {UserRole} from "../../DAL/entities/UserRole.entity";
import {Role} from "../../DAL/entities/Role.entity";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository : Repository<User>,
                @InjectRepository(File) private readonly fileRepository: Repository<File>,
                @InjectRepository(UserRole) private readonly userRolesRepository: Repository<UserRole>,
                @InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

    async getUsersByFilter(request: GetUsersByFilterRequestDto): Promise<GetUsersByFilterResponseDto> {
        let query = this.userRepository.createQueryBuilder('u')
            .where("1 = 1");

        if(request.userName)
            query = query
                .andWhere('LOWER("u"."UserName") LIKE :userName',
                    {userName: request.userName.toLowerCase()});

        if(request.id)
            query = query
                .andWhere('LOWER("u"."Id") LIKE :id',
                    {id: request.id.toLowerCase()});

        if(request.email)
            query = query
                .andWhere('LOWER("u"."Email") LIKE :email',
                    { email: request.email.toLowerCase() });

        // @ts-ignore
        if(request.isNullRefresh != undefined && request.isNullRefresh == "true")
            query = query
                .andWhere('"u"."RefreshToken" IS null');
        // @ts-ignore
        else if(request.isNullRefresh != undefined && request.isNullRefresh == "false")
            query = query
                .andWhere('"u"."RefreshToken" IS NOT null');

        // @ts-ignore
        if(request.isNullAccess != undefined && request.isNullAccess == "true")
            query = query
                .andWhere('"u"."AccessToken" IS null');
        // @ts-ignore
        else if(request.isNullAccess != undefined && request.isNullAccess == "false")
            query = query
                .andWhere('"u"."AccessToken" IS NOT null');

        // @ts-ignore
        if(request.isExpiredRefresh != undefined && request.isExpiredRefresh == "true")
            query = query
                .andWhere('"u"."RefreshToken" IS NOT null')
                .andWhere('"u"."RefreshTokenExpiryTime" AT TIME ZONE \'UTC\' < CURRENT_DATE AT TIME ZONE \'UTC\'');
        // @ts-ignore
        else if(request.isExpiredRefresh != undefined && request.isExpiredRefresh == "false")
            query = query
                .andWhere('"u"."RefreshToken" IS NOT null')
                .andWhere('"u"."RefreshTokenExpiryTime" AT TIME ZONE \'UTC\' > CURRENT_DATE AT TIME ZONE \'UTC\'');

        if(request.isEmailConfirmed != undefined)
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

        let result =  new GetUsersByFilterResponseDto();
        result.totalCount = totalCount;
        result.users = responseItems;

        return result;
    }

    async deleteUser(request: DeleteUserRequestDto): Promise<DeleteUserResponseDto> {
        let user = await this.userRepository.findOneByOrFail({"Id": request.id});

        if(!user)
            throw new NotFoundException("User not found");

        await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("Id = :id", { id: request.id })
            .execute()

        return new DeleteUserResponseDto(request.id);
    }

    async updateUser(request: PatchUpdateUserRequestDto): Promise<void> {
        let user = await this.userRepository.findOneByOrFail({"Id": request.id});

        if(!user)
            throw new NotFoundException("User not found");

        if(request.emailConfirmed != undefined)
            user.EmailConfirmed = request.emailConfirmed;

        if(request.userName != undefined)
            user.UserName = request.userName;

        let imageFileId = await this.fileRepository.findOneByOrFail({"Id": request.userPhotoId})
        if(request.userPhotoId != undefined && imageFileId)
            user.UserPhotoId = request.userPhotoId;
        else if(!imageFileId && request.userPhotoId != undefined)
            throw new NotFoundException("Image file not found");

        let role = await this.roleRepository.findOneByOrFail({"Name": request.userName.toUpperCase()});
        if(role && request.role != undefined)
        {
            let currentRole = await this.userRolesRepository.findOneByOrFail({"UserId": request.id});
            currentRole.RoleId = role.Id;
            await this.userRolesRepository.save(currentRole);
        }

        await this.userRepository.save(user);
    }
}