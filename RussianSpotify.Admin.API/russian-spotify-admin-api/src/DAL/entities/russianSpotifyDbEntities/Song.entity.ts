import {Column, Entity, PrimaryColumn} from "typeorm";
import {Playlist} from "./Playlist.entity";
import {User} from "./User.entity";
import {Category} from "./Category.entity";
import {Bucket} from "./Bucket.entity";

@Entity({name: "Songs", synchronize: false})
export class Song {
    @PrimaryColumn()
    Id: string;
    @Column()
    SongName: string;
    @Column()
    Duration: number;
    @Column()
    PlaysNumber: number;
    Playlists: Playlist[];
    Authors: User[];
    @Column()
    CategoryId: string;

    Category: Category;

    Files: File[];
    Image: File | null;
    @Column()
    ImageId: string | null;
    Buckets: Bucket[];
}