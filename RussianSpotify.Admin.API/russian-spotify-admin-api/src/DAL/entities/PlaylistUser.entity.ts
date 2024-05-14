import {Column, Entity, PrimaryColumn} from "typeorm";
import {Playlist} from "./Playlist.entity";
import {User} from "./User.entity";

@Entity("PlaylistUser")
export class PlaylistUser {
    @PrimaryColumn({unique: false})
    PlaylistId: string;

    Playlist: Playlist;

    @Column()
    UserId: string;

    User: User;

    @Column()
    AddedDate: string;
}