import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Post {
    // Those correspond to to columns, so the table will have 4 columns
    @PrimaryKey()
    id!: number;

    @Property({type:"date"})
    createdAt: Date = new Date();

    @Property({type:"date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Property({type:"text"})
    title: string;
}