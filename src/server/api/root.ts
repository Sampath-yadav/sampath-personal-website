import { contactRouter } from "~/server/api/routers/contact";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * Primary router for the server. Add new routers in `/api/routers` and
 * register them here.
 */
export const appRouter = createTRPCRouter({
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
