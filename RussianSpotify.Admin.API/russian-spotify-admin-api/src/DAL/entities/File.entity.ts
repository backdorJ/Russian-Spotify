import {Entity, PrimaryColumn} from "typeorm";
import {Song} from "./Song.entity";
import {Playlist} from "./Playlist.entity";
import {User} from "./User.entity";

@Entity("Files")
export class File {
    @PrimaryColumn()
    Id: string;
    Address: string;
    Size: number;
    FileName: string | null;
    ContentType: string | null;
    Song: Song | null;
    Playlist: Playlist | null;
    UserId: string | null;
    User: User | null;
}