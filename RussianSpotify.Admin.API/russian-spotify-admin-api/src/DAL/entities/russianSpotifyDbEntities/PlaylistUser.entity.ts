import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Playlist} from "./Playlist.entity";
import {User} from "./User.entity";

@Entity({name: "PlaylistUser", synchronize: false})
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