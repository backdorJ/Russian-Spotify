import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'SongUser', synchronize: false})
export class SongUser {
    @PrimaryColumn({unique: false})
    AuthorsId: string;
    @Column()
    SongsId: string;
}