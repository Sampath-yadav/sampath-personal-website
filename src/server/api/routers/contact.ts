import { TRPCError } from "@trpc/server";

import { env } from "~/env";
import { contactSchema } from "~/lib/contact-schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * Very small in-memory rate limit (per IP). It resets when the server
 * restarts and is per-instance on serverless hosts, so treat it as a
 * speed bump rather than real abuse protection.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

export const contactRouter = createTRPCRouter({
  send: publicProcedure
    .input(contactSchema)
    .mutation(async ({ ctx, input }) => {
      // Honeypot filled in: pretend everything worked.
      if (input.company) return { ok: true as const };

      const ip =
        ctx.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
      if (isRateLimited(ip)) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many messages. Please try again in a few minutes.",
        });
      }

      const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
      if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "CONTACT_NOT_CONFIGURED",
        });
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],
          reply_to: input.email,
          subject: `Portfolio message from ${input.name}`,
          text: `${input.message}\n\n- ${input.name} <${input.email}>`,
        }),
      });

      if (!res.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "The message could not be delivered.",
        });
      }

      return { ok: true as const };
    }),
});
