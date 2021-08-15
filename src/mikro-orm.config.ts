import {Post} from "./entitites/Post";
import {PROD} from "./constants";
import {MikroORM} from "@mikro-orm/core";
import path from "path";
import {User} from "./entitites/User";

export default  {
    migrations: {
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [Post, User],
    dbName: "reddit",
    user: "postgres",
    password: "test",
    debug: !PROD,
    type: "postgresql"
//    TS trick to get the correct types. We get the types of the mikroOrm.init function
} as Parameters<typeof MikroORM.init>[0]
