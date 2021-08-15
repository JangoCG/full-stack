import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Post} from "../entitites/Post";
import {MyContext} from "../types";

@Resolver()
export class PostResolver {
  // get all posts
  // Inside the decorator the return type is defined. Always uppercase
  @Query(() => [Post]) // GraphQl Type -  [] means a array of posts.
  // Access the special context object
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    // TS Type
    return ctx.em.find(Post, {});
  }

  /**
   * Get a single post by id
   * @param id
   * @param ctx
   */
  @Query(() => Post, { nullable: true }) // GraphQL Type nullable: true = or null in ts type
   post(
    @Arg("id") id: number, // First Type is inferred GraphQL type, second Type is TS type
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
     return ctx.em.findOne(Post, {id});
  }

  /**
   * Create a single post
   * @param title
   * @param em
   */
  // Queries are for getting Data and Mutations are for creating and updating data
  @Mutation(() => Post) // GraphQL Type nullable: true = or null in ts type
  async createPost(
    @Arg("title") title: string, // GraphQL can actually infer the types here from ts types
    // @Ctx() ctx: MyContext
    @Ctx() { em }: MyContext // Alternatively destructure the entity manager
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  /**
   * Update a post by id
   * @param id
   * @param title
   * @param em
   */
  @Mutation(() => Post, { nullable: true }) // GraphQL Type nullable: true = or null in ts type
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string, // title can be null
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }

  /**
   * Delete a single post by id
   * @param id
   * @param em
   */
  @Mutation(() => Boolean) // GraphQL Type nullable: true = or null in ts type
  async deletePost(
      @Arg("id") id: number,
      @Ctx("") {em}: MyContext,
  ): Promise<boolean> {
    await em.nativeDelete(Post, {id});
    return true;
  }
}
