import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("AspNetRoles")
export class Role {
    @PrimaryColumn()
    Id: string;
    @Column()
    Name: string;
    @Column()
    NormalizedName: string;
}