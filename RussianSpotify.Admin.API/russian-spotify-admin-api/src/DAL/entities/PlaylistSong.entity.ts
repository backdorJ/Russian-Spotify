import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class PlaylistSong {
    @PrimaryColumn({unique: false})
    PlaylistsId: string;
    @Column()
    SongsId: string;
}