import { z } from "zod";

/** Shared by the form (client) and the tRPC procedure (server). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a bit long. Keep it under 80 characters."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address, like name@example.com."),
  message: z
    .string()
    .trim()
    .min(10, "Add a little more detail. At least 10 characters.")
    .max(2000, "Keep the message under 2000 characters."),
  /** Honeypot: real visitors never see or fill this field. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
