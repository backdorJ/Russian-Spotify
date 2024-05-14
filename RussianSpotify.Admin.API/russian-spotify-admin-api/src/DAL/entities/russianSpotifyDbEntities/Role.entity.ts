import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "AspNetRoles", synchronize: false})
export class Role {
    @PrimaryColumn()
    Id: string;
    @Column()
    Name: string;
    @Column()
    NormalizedName: string;
}