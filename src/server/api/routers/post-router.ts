import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { newPostSchema } from "@/pages/newpost";
import { uploadImage } from "@/helpers/upload-image";

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

  getMany: publicProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        limit: z.number().min(1).max(8),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor: postIdCursor, limit } = input;
      const posts = await ctx.prisma.post.findMany({
        include: {
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

      let nextCursor: typeof postIdCursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return {
        posts,
        postIdCursor: nextCursor,
      };
    }),
});
