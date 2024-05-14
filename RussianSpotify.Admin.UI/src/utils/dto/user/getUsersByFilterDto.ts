export default class GetUsersByFilterDto {
    pageNumber: number | null = null;
    pageSize: number | null = null;
    userName: string | null = null;
    id: string | null = null;
    email: string | null = null;
    isNullRefresh: boolean | null = null;
    isNullAccess: boolean | null = null;
    isExpiredRefresh: boolean | null = null;
    isEmailConfirmed: boolean | null = null;
    role: string | null = null;

    constructor(pageNumber: number | null = null,
                pageSize: number | null = null,
                userName: string | null = null,
                id: string | null = null,
                email: string | null = null,
                isNullRefresh: boolean | null = null,
                isNullAccess: boolean | null = null,
                isExpiredRefresh: boolean | null = null,
                isEmailConfirmed: boolean | null = null,
                role: string | null = null) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.isNullRefresh = isNullRefresh;
        this.isNullAccess = isNullAccess;
        this.isExpiredRefresh = isExpiredRefresh;
        this.isEmailConfirmed = isEmailConfirmed;
        this.role = role;
    }
}