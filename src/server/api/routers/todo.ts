import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  create: protectedProcedure
    .input(z.object({ todo: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.todo.create({
        data: { userId: ctx.session.user.id, todo: input.todo },
      });
    }),

  getUserTodos: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
});
