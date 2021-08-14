import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import { Post } from "../entitites/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {

  // get all posts
  // Inside the decorator the return type is defined. Always uppercase
  @Query(() => [Post]) // GraphQl Type
  // Access the special context object
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    // TS Type
    return ctx.em.find(Post, {});
  }

  // get a single post
  @Query(() => [Post], {nullable: true}) // GraphQL Type nullable: true = or null in ts type
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    return ctx.em.findOne(Post, { id });
  }
}
