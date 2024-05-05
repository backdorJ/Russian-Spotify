import {Entity, PrimaryColumn} from "typeorm";
import {User} from "./User.entity";

@Entity("Subscribes")
export class Subscribe {
    @PrimaryColumn()
    Id: string;
    DateStart: string | null;
    DateEnd: string | null;
    User: User;
    UserId: string;
}