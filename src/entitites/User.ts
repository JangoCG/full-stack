import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType() // Converts the class to a GraphQl Type
@Entity()
export class User {
    // Those correspond to to columns, so the table will have 4 columns
    @Field(() => Int) // Exposes the field to the GraphQL schema.
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({type:"date"})
    createdAt: Date = new Date();

    @Field(() => String)
    @Property({type:"date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Field()
    @Property({type:"text", unique: true})
    username: string;

    // @Field() No Field Property = It will not get exposed
    @Property({type:"text"})
    password: string;
}