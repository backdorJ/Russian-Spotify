import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("BucketSong")
export class BucketSong {
    @PrimaryColumn({unique: false})
    BucketsId: string;
    @Column()
    SongIds: string;
}