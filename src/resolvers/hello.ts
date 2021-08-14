import {Query, Resolver} from "type-graphql";

@Resolver()
export class HelloResolver {
    // Inside the decorator the return type is defined. Always uppercase
    @Query(() => String)
    hello() {
        return "hello world"
    }
}