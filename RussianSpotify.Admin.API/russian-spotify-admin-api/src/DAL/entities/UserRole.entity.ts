import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("AspNetUserRoles")
export class UserRole {
    @PrimaryColumn()
    private readonly id: string;

    @Column()
    UserId: string;
    @Column()
    RoleId: string;
}