import {Column, Entity, ManyToOne} from "typeorm";
import {Playlist} from "./Playlist.entity";
import {User} from "./User.entity";

@Entity("PlaylistUser")
export class PlaylistUser {
    @Column()
    PlaylistId: string;

    Playlist: Playlist;

    @Column()
    UserId: string;

    User: User;

    @Column()
    AddedDate: string;
}