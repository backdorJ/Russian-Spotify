import {Column, Entity, PrimaryColumn} from "typeorm";
import {Bucket} from "./Bucket.entity";
import {Subscribe} from "./Subscribe.entity";
import {Playlist} from "./Playlist.entity";
import {Song} from "./Song.entity";
import {File} from "./File.entity";

@Entity({name: "AspNetUsers", synchronize: false})
export class User {
    @PrimaryColumn()
    Id: string;

    @Column()
    PasswordHash: string;

    @Column()
    UserName: string;

    @Column()
    EmailConfirmed: boolean;

    @Column()
    NormalizedUserName: string;

    @Column()
    Email: string;

    @Column()
    AccessToken: string | null;

    @Column()
    RefreshToken: string | null;

    @Column()
    RefreshTokenExpiryTime: string | null;

    @Column()
    UserPhotoId: string | null;

    UserPhoto: File | null;

    Files: File[];

    @Column()
    Birthday: string | null;

    @Column()
    Phone: string | null;

    @Column()
    IsConfirmed: boolean;

    Role: string;

    Bucket: Bucket | null;

    Subscribe: Subscribe | null;

    Playlists: Playlist[] | null;

    AuthorPlaylists: Playlist[];

    Songs: Song[] | null;
}