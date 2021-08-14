import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config"
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";

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
            resolvers: [HelloResolver],
            validate: false
        })
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