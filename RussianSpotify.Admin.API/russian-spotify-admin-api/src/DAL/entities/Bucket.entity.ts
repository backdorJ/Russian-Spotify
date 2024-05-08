import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User.entity";
import {Song} from "./Song.entity";

@Entity("Buckets")
export class Bucket {
    @PrimaryColumn({type: "uuid"})
    Id: string;

    User: User;
    @Column()
    UserId: string;
    Songs: Song[];
}
