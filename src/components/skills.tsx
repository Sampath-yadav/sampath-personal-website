"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";

import { RevealGroup, RevealItem } from "~/components/reveal";
import { SectionHeading } from "~/components/section-heading";
import { skillGroups } from "~/data/skills";
import { cn } from "~/lib/cn";

export function Skills() {
  const [openId, setOpenId] = useState<string | null>(
    skillGroups[0]?.id ?? null,
  );

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="panel px-5 pt-10 pb-12 sm:px-10 sm:pt-12 sm:pb-16 lg:px-14"
    >
      <SectionHeading ghost="SKILLS" title="Skills" id="skills-title" />

      <RevealGroup as="ul" delay={0.2} className="mt-10 lg:mt-14">
        {skillGroups.map((g, i) => {
          const open = openId === g.id;
          const tilt = i % 2 === 0 ? -3 : 3;
          return (
            <RevealItem
              as="li"
              key={g.id}
              className={cn(
                "border-line border-b",
                open && "border-transparent",
              )}
            >
              <div
                className={cn(
                  "relative rounded-[4px] transition-colors duration-300",
                  open
                    ? "on-dark bg-night text-white shadow-[var(--shadow-card)]"
                    : "",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`skills-${g.id}`}
                    onClick={() => setOpenId(open ? null : g.id)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-6 text-left sm:px-5 sm:py-7"
                  >
                    <span className="text-[clamp(1.7rem,4.4vw,3.5rem)] leading-none font-medium tracking-[-0.025em] uppercase">
                      {g.title}
                    </span>
                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center"
                    >
                      {open ? (
                        <X size={28} strokeWidth={1.5} />
                      ) : (
                        <ArrowUpRight size={28} strokeWidth={1.5} />
                      )}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`skills-${g.id}`}
                      role="region"
                      aria-label={`${g.title} skills`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 px-4 pt-0 pb-7 sm:px-5 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
                        <p className="max-w-[30ch] text-[0.9375rem] leading-relaxed text-white/70">
                          {g.description}
                        </p>
                        <div
                          className="text-ink w-full rounded-[4px] bg-white p-4 shadow-[var(--shadow-card)] md:w-[22rem] md:origin-center md:-translate-y-2 lg:w-[26rem]"
                          style={{ rotate: `${tilt}deg` }}
                        >
                          <ul className="flex flex-wrap gap-2">
                            {g.items.map((item) => (
                              <li
                                key={item}
                                className="border-line bg-mist rounded-full border px-3 py-1.5 text-[0.8125rem] font-semibold"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
