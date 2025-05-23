import { uploadImage } from "@/helpers/upload-image";
import { newPostSchema } from "@/pages/newpost";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { RouterOutputs } from "@/utils/api";
import { TRPCError } from "@trpc/server";
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

  delete: protectedProcedure
    .input(z.number().int().positive())
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUniqueOrThrow({
        where: { id: input },
      });

      if (post?.authorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.post.delete({
        where: {
          id: input,
        },
      });
    }),

  getFeed: publicProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        searchTerm: z.string().max(32).optional(),
        sort: z.enum(["", "new", "likes"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const postsPerPage = 8;
      const { cursor: postIdCursor } = input;

      const searchFilter = input.searchTerm?.length
        ? {
            title: { search: input.searchTerm },
            approvedAt: { not: null },
          }
        : { approvedAt: { not: null } };

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
        take: postsPerPage + 1,
        cursor: postIdCursor ? { id: postIdCursor } : undefined,
        orderBy: {
          id: "desc",
        },
      });

      const nextCursor = getNextCursor(posts, postsPerPage);

      return {
        posts,
        postIdCursor: nextCursor,
      };
    }),

  getMyFeed: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
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
      orderBy: {
        id: "desc",
      },
    });

    return posts;
  }),
});

function getNextCursor(
  posts: RouterOutputs["post"]["getFeed"]["posts"],
  limit: number,
): number | undefined {
  return posts.length > limit ? posts.pop()?.id : undefined;
}
