import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getRating: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: input },
      // data: {
      //   ratedBy
      // }
    });

    if (!user) return null;
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
