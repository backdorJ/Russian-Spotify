import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "BucketSong", synchronize: false})
export class BucketSong {
    @PrimaryColumn({unique: false})
    BucketsId: string;
    @Column()
    SongIds: string;
}