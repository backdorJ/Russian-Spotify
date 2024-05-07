import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class SongUser {
    @PrimaryColumn()
    private id: string;

    @Column()
    AuthorsId: string;
    @Column()
    SongsId: string;
}