import {Column, Entity, PrimaryColumn} from "typeorm";
import {User} from "./User.entity";
import {Song} from "./Song.entity";

@Entity({name: "Buckets", synchronize: false})
export class Bucket {
    @PrimaryColumn({type: "uuid"})
    Id: string;

    User: User;
    @Column()
    UserId: string;
    Songs: Song[];
}
