import {Entity, PrimaryColumn} from "typeorm";
import {Song} from "./Song.entity";
import {CategoryTypes} from "../enums/CategoryTypes";

@Entity({name: "Categories", synchronize: false})
export class Category {
    @PrimaryColumn()
    Id: string;
    CategoryName: CategoryTypes;
    Songs: Song[];
}