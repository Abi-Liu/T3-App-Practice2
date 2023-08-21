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
    .input(z.object({ todo: z.string().nonempty() }))
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

  toggleComplete: protectedProcedure
    .input(z.object({ id: z.string(), complete: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.update({
        where: { id: input.id },
        data: { complete: !input.complete },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.delete({ where: { id: input.id } });
    }),
});
