import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  updateCoords: protectedProcedure
    .input(
      z.object({
        lat: z.number(),
        long: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("updateCoords", input);
      console.log("userId", ctx.session.user.id);

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
