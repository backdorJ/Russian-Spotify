import {Column, Entity, PrimaryColumn} from "typeorm";
import {User} from "./User.entity";
import {Song} from "./Song.entity";

@Entity("Buckets")
export class Bucket {
    @PrimaryColumn()
    Id: string;

    User: User;
    @Column()
    UserId: string;
    Songs: Song[];
}
