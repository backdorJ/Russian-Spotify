import {Column, Entity, PrimaryColumn} from "typeorm";
import {User} from "./User.entity";

@Entity({name: "Subscribes", synchronize: false})
export class Subscribe {
    @PrimaryColumn()
    Id: string;
    @Column()
    DateStart: string | null;
    @Column()
    DateEnd: string | null;
    User: User;
    @Column()
    UserId: string;
}