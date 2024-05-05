import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {PlaylistUser} from "./PlaylistUser.entity";
import {User} from "./User.entity";
import {Song} from "./Song.entity";

@Entity('Playlists')
export class Playlist {
    @PrimaryColumn()
    Id: string;
    @Column()
    PlaylistName: string;
    Image: File | null;
    @Column()
    ImageId: string | null;
    @Column()
    AuthorId: string;
    Author: User | null;
    @Column()
    ReleaseDate: string;
    @Column()
    PlaysNumber: number;
    Songs: Song[] | null;

    Users: User[] | null;
    @Column()
    IsAlbum: boolean;
}