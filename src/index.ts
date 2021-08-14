import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config"
import "reflect-metadata";
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    // automatically run the migrations
    await orm.getMigrator().up();
    // create the object
    // const post = orm.em.create(Post, {title: "my first post"});
    // // save it to db
    // await orm.em.persistAndFlush(post);
    // get all posts
    // const posts = await orm.em.find(Post, {})

    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        // Context is a special object. All resolvers have access to this object.
        // So I pass the entity manager to context to access it from my resolvers.
        context:() => ({em: orm.em})
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    })
}
main().catch(err => {
    console.log(err);
});