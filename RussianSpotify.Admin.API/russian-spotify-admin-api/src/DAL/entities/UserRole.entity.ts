import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "AspNetUserRoles", synchronize: false})
export class UserRole {
    @PrimaryColumn({unique: false})
    UserId: string;
    @Column()
    RoleId: string;
}