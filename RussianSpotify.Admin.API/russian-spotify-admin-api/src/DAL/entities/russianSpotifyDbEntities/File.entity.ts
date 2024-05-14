import {Column, Entity, PrimaryColumn} from "typeorm";
import {Song} from "./Song.entity";
import {Playlist} from "./Playlist.entity";
import {User} from "./User.entity";

@Entity({name: "Files", synchronize: false})
export class File {
    @PrimaryColumn()
    Id: string;
    @Column()
    Address: string;
    @Column()
    Size: number;
    @Column()
    FileName: string | null;
    @Column()
    ContentType: string | null;
    Song: Song | null;
    Playlist: Playlist | null;
    @Column()
    UserId: string | null;
    User: User | null;
    @Column()
    SongId: string | null;
}