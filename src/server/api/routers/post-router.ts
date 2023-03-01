import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { postSchema } from "@/pages/newpost";
import type { PostWithCoords } from "@/components/feed";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(postSchema)
    .mutation(async ({ ctx, input }) => {
      const createdPost = await ctx.prisma.post.create({
        data: {
          ...input,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return createdPost;
    }),

  getMany: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(8),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const posts = await ctx.prisma.post.findMany({
        include: {
          author: {
            include: {
              location: true,
            },
          },
        },
        orderBy: [{ createdAt: "desc" }],
        take: limit,
      });

      const feedPosts = posts.map((post) => {
        const { updatedAt, author, ...feedPost } = post;
        const { lat, long } = author.location;

        return {
          ...feedPost,
          coords: {
            lat: lat.toNumber(),
            long: long.toNumber(),
          },
        } as PostWithCoords;
      });

      return {
        feedPosts,
        cursor: cursor,
      };
    }),
});
