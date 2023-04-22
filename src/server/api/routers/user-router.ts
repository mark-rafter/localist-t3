import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getRating: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const ratings = await ctx.prisma.userRating.aggregate({
      where: {
        ratingForId: input,
      },
      _avg: {
        score: true,
      },
    });

    return ratings._avg.score?.toFixed(2) ?? "No Rating";
  }),

  updateCoords: protectedProcedure
    .input(
      z.object({
        lat: z.number(),
        long: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          lat: input.lat,
          long: input.long,
        },
      });

      return updatedUser;
    }),
});
