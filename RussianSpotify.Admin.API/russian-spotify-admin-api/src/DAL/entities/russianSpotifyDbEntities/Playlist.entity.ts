import {Column, Entity, PrimaryColumn} from "typeorm";
import {User} from "./User.entity";
import {Song} from "./Song.entity";

@Entity({name: 'Playlists', synchronize: false})
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