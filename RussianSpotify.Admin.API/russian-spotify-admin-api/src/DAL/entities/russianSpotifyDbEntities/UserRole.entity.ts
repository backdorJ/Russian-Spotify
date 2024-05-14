import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "AspNetUserRoles", synchronize: false})
export class UserRole {
    @PrimaryColumn()
    UserId: string;
    @Column()
    RoleId: string;
}