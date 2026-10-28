"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ContactForm } from "~/components/contact-form";
import { Reveal, RevealGroup, RevealItem } from "~/components/reveal";
import { SocialPill } from "~/components/social-pill";
import { getSocialLinks, site } from "~/data/site";

export function Contact() {
  const [open, setOpen] = useState(false);
  const socials = getSocialLinks();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="panel !bg-white/80 px-5 pt-14 pb-8 text-center sm:px-10 sm:pt-20 lg:px-14"
    >
      <Reveal>
        <p className="pill mx-auto">
          <span className="live-dot" aria-hidden />
          {site.status}
        </p>
      </Reveal>
      <Reveal
        as="h2"
        delay={0.1}
        id="contact-title"
        className="mx-auto mt-6 text-[clamp(2rem,4.3vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.025em] text-balance uppercase"
      >
        Have a project or role in mind?
      </Reveal>
      <Reveal
        as="p"
        delay={0.2}
        className="text-ink-soft mx-auto mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed"
      >
        Tell me what you&apos;re building or hiring for. I&apos;d be glad to
        hear about it.
      </Reveal>

      <Reveal delay={0.3}>
        <button
          type="button"
          className="btn-dark mt-8 !px-6 !py-3.5 ring-4 ring-black/10"
          aria-expanded={open}
          aria-controls="contact-form-wrap"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide form" : "Contact me"}{" "}
          <ArrowUpRight size={16} aria-hidden />
        </button>
      </Reveal>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="contact-form-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="relative mx-auto mt-8 max-w-2xl pb-2">
              <ContactForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RevealGroup
        as="ul"
        className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-3 sm:mt-20"
        aria-label="Profiles and contact"
      >
        <RevealItem as="li">
          <a
            href="#top"
            className="pill !bg-ink !text-white"
            aria-label="Back to top"
          >
            <Image
              src="/images/avatar.webp"
              alt=""
              width={28}
              height={28}
              className="-ml-2 size-7 rounded-full bg-white object-cover"
            />
            {site.shortName}
          </a>
        </RevealItem>
        {socials.map((s) => (
          <RevealItem as="li" key={s.label}>
            <SocialPill link={s} />
          </RevealItem>
        ))}
      </RevealGroup>

      <footer className="text-muted mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-black/10 pt-6 text-sm">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>Designed and built with Next.js, tRPC and Tailwind CSS</p>
      </footer>
    </section>
  );
}
