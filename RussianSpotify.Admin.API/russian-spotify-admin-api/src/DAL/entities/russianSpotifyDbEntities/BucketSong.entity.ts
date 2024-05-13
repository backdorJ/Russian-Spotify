import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "BucketSong", synchronize: false})
export class BucketSong {
    @PrimaryColumn()
    private id: string;

    @Column()
    BucketsId: string;
    @Column()
    SongIds: string;
}