import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "AuthorsStatistics", synchronize: true})
export class AuthorsStatistic {
    @PrimaryGeneratedColumn('uuid', { name: 'Id' })
    id: string;

    @Column("uuid", { nullable: false, name: "AuthorId" })
    authorId: string;

    @Column("int", { nullable: false, name: "SongsCount" })
    songsCount: number;

    @Column("int", { nullable: false, name: "TotalSongsCount" })
    totalSongsCount: number;

    @Column("int", { nullable: false, name: "PlaysCount" })
    playsCount: number;

    @Column("int", { nullable: false, name: "TotalPlaysCount" })
    totalPlaysCount: number;

    @Column("int", { nullable: false, name: "AlbumsCount" })
    albumsCount: number;

    @Column("int", { nullable: false, name: "TotalAlbumsCount" })
    totalAlbumsCount: number;

    @Column("date", { nullable: false, name: "StatisticCollectionDate" })
    statisticCollectionDate : string;

    @Column('int', {name: 'StatisticCount', nullable: false})
    statisticCount : number;
}