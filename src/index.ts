import {MikroORM} from "@mikro-orm/core";
import {Post} from "./entitites/Post"
import microConfig from "./mikro-orm.config"
import express from 'express';
import {ApolloServer, gql} from "apollo-server-express";
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


    async function startApolloServer() {
        // Construct a schema, using GraphQL schema language
        const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

        // Provide resolver functions for your schema fields
        const resolvers = {
            Query: {
                hello: () => 'Hello world!',
            },
        };

        const server = new ApolloServer({typeDefs, resolvers});
        await server.start();

        const app = express();
        server.applyMiddleware({app});

        await new Promise(resolve => app.listen({port: 4000}, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        return {server, app};
    }


    const app = express();


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    });

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    })
}
main().catch(err => {
    console.log(err);
});