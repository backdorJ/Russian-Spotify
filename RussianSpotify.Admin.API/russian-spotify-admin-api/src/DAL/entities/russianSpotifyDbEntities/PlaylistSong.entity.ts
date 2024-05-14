import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'PlaylistSong', synchronize: false})
export class PlaylistSong {
    @PrimaryColumn({unique: false})
    PlaylistsId: string;
    @Column()
    SongsId: string;
}