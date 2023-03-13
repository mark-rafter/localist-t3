import { uploadImage } from "@/helpers/upload-image";
import { newPostSchema } from "@/pages/newpost";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { RouterOutputs } from "@/utils/api";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newPostSchema)
    .mutation(async ({ ctx, input }) => {
      // todo: temp workaround, reshape newPostSchema to have "details" object containing brand
      const { brand, ...newPost } = input;

      const images = await Promise.all(input.images.map(uploadImage));

      const createdPost = await ctx.prisma.post.create({
        data: {
          ...newPost,
          images: images,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return createdPost;
    }),

  getFeed: publicProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        limit: z.number().min(1).max(8),
        searchTerm: z.string().max(32).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor: postIdCursor, limit } = input;

      const searchFilter = input.searchTerm?.length
        ? {
            title: { search: input.searchTerm },
          }
        : {};

      const posts = await ctx.prisma.post.findMany({
        where: searchFilter,
        select: {
          id: true,
          title: true,
          size: true,
          price: true,
          images: true,
          createdAt: true,
          author: {
            select: {
              lat: true,
              long: true,
            },
          },
        },
        take: limit + 1,
        cursor: postIdCursor ? { id: postIdCursor } : undefined,
        orderBy: {
          id: "desc",
        },
      });

      const nextCursor = getNextCursor(posts, limit);

      return {
        posts,
        postIdCursor: nextCursor,
      };
    }),
});

function getNextCursor(
  posts: RouterOutputs["post"]["getFeed"]["posts"],
  limit: number
): number | undefined {
  if (posts.length > limit) {
    const nextPost = posts.pop();
    return nextPost?.id;
  }
  return undefined;
}
