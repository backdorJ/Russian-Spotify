import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class PlaylistSong {
    @PrimaryColumn()
    private id: string;

    @Column()
    PlaylistsId: string;
    @Column()
    SongsId: string;
}