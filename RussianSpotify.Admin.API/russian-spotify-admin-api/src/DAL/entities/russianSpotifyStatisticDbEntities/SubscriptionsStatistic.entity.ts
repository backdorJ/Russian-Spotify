import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "SubscriptionsStatistics", synchronize: true})
export class SubscriptionsStatistic {
    @PrimaryGeneratedColumn('uuid', { name: 'Id' })
    id: string;

    @Column('int', { nullable: false, name: 'CountActive' })
    countActive: number;

    @Column('int', { nullable: false, name: 'CountBought' })
    countBought: number;

    @Column('int', { nullable: false, name: 'CountInactive' })
    countInactive: number;

    @Column("date", { nullable: false, name: "StatisticCollectionDate" })
    statisticCollectionDate : string;

    @Column('int', {name: 'StatisticCount', nullable: false})
    statisticCount : number;
}