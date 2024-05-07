import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("BucketSong")
export class BucketSong {
    @PrimaryColumn()
    private id: string;

    @Column()
    BucketsId: string;
    @Column()
    SongIds: string;
}