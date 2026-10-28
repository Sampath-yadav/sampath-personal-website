"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  CircleAlert,
  CircleCheck,
  LoaderCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { site } from "~/data/site";
import { contactSchema, type ContactInput } from "~/lib/contact-schema";
import { api } from "~/trpc/react";

type Status =
  | { kind: "idle" }
  | { kind: "sent"; name: string }
  | { kind: "not-configured" }
  | { kind: "error"; message: string };

const field =
  "w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[0.9375rem] outline-none transition-shadow placeholder:text-muted/70 focus:border-ink focus:shadow-[0_0_0_3px_rgb(0_0_0/0.08)] aria-[invalid=true]:border-red-600";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const send = api.contact.send.useMutation({
    onSuccess: (_d, vars) => {
      setStatus({ kind: "sent", name: vars.name });
      reset();
    },
    onError: (err) => {
      if (err.message === "CONTACT_NOT_CONFIGURED") {
        setStatus({ kind: "not-configured" });
      } else {
        setStatus({
          kind: "error",
          message: err.data?.zodError
            ? "Please check the highlighted fields and try again."
            : err.message || "Something went wrong. Please try again.",
        });
      }
    },
  });

  if (status.kind === "sent") {
    return (
      <div
        role="status"
        className="rounded-[10px] bg-white p-6 text-left shadow-[var(--shadow-card)]"
      >
        <p className="flex items-center gap-2 text-lg font-semibold">
          <CircleCheck size={20} aria-hidden /> Message sent
        </p>
        <p className="text-ink-soft mt-2 text-[0.9375rem]">
          Thanks, {status.name}. I&apos;ll read it and reply by email.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold underline underline-offset-4"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another message
        </button>
      </div>
    );
  }

  const mailto = () => {
    const v = getValues();
    const body = `${v.message}\n\n${v.name}`.trim();
    return `mailto:${site.email}?subject=${encodeURIComponent(
      "Hello from your portfolio",
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={handleSubmit((values) => {
        setStatus({ kind: "idle" });
        send.mutate(values);
      })}
      noValidate
      className="space-y-4 rounded-[10px] bg-white/90 p-5 text-left shadow-[var(--shadow-card)] sm:p-6"
      aria-label="Contact form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cf-name"
            className="mb-1.5 block text-sm font-semibold"
          >
            Your name
          </label>
          <input
            id="cf-name"
            autoComplete="name"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="cf-name-err" className="mt-1.5 text-sm text-red-700">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="cf-email"
            className="mb-1.5 block text-sm font-semibold"
          >
            Your email
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={field}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="cf-email-err" className="mt-1.5 text-sm text-red-700">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="cf-message"
          className="mb-1.5 block text-sm font-semibold"
        >
          What are you working on?
        </label>
        <textarea
          id="cf-message"
          rows={5}
          className={`${field} resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-1.5 text-sm text-red-700">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot for bots. Hidden from people and assistive tech. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="cf-company">Company</label>
        <input
          id="cf-company"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      {status.kind === "not-configured" && (
        <div
          role="alert"
          className="border-line bg-mist flex gap-3 rounded-[10px] border p-4 text-sm"
        >
          <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
          <p>
            This form isn&apos;t connected to an inbox yet, so nothing was sent.{" "}
            <a
              href={mailto()}
              className="font-semibold underline underline-offset-4"
            >
              Email {site.email}
            </a>{" "}
            instead.
          </p>
        </div>
      )}
      {status.kind === "error" && (
        <div
          role="alert"
          className="flex gap-3 rounded-[10px] border border-red-200 bg-red-50 p-4 text-sm text-red-900"
        >
          <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
          <p>{status.message}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-dark" disabled={send.isPending}>
          {send.isPending ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden />{" "}
              Sending
            </>
          ) : (
            <>
              Send message <ArrowUpRight size={16} aria-hidden />
            </>
          )}
        </button>
        <a
          href={`mailto:${site.email}`}
          className="text-sm font-semibold underline underline-offset-4"
        >
          Or email {site.email}
        </a>
      </div>
    </form>
  );
}
