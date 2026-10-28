"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { ProjectArt } from "~/components/project-art";
import { Reveal, RevealGroup, RevealItem } from "~/components/reveal";
import { SectionHeading } from "~/components/section-heading";
import { experience } from "~/data/experience";
import { projects, type Project } from "~/data/projects";

const shipped = projects.filter((p) => p.company);

export function Experience() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    x.set(e.clientX - r.left + 28);
    y.set(e.clientY - r.top - 70);
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="panel panel-night on-dark px-5 pt-10 pb-12 sm:px-10 sm:pt-12 sm:pb-16 lg:px-14"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6">
        <SectionHeading
          ghost="EXPERIENCE"
          title="Experience"
          id="experience-title"
          className="min-w-0 flex-1"
        />
        <Reveal
          as="p"
          delay={0.25}
          className="pb-1 text-[0.9375rem] font-medium text-white/80"
        >
          Since Oct 2025
        </Reveal>
      </div>

      <div className="mt-10 lg:mt-14">
        <Reveal delay={0.2} className="border-night-line border-t py-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
            <div>
              <h3 className="text-xl font-semibold sm:text-2xl">
                {experience.company}
              </h3>
              <p className="text-night-muted mt-1 text-[1.0625rem]">
                {experience.role}, {experience.location}
              </p>
            </div>
            <p className="text-night-muted text-[1.0625rem]">
              {experience.period}
            </p>
          </div>
          <p className="mt-5 max-w-[68ch] text-[0.9375rem] leading-relaxed text-white/70">
            {experience.summary}
          </p>
        </Reveal>

        <Reveal
          as="p"
          className="border-night-line text-night-muted border-t pt-6 text-sm"
        >
          What I built there
        </Reveal>

        <div
          ref={wrap}
          className="relative"
          onPointerMove={onMove}
          onPointerLeave={() => setHovered(null)}
        >
          <RevealGroup as="ul" delay={0.1}>
            {shipped.map((p) => (
              <RevealItem
                as="li"
                key={p.slug}
                className="border-night-line border-b last:border-b-0"
              >
                <Link
                  href={`/work/${p.slug}`}
                  onPointerEnter={(e) =>
                    e.pointerType === "mouse" && setHovered(p)
                  }
                  className="group flex items-center justify-between gap-6 py-6 transition-colors"
                >
                  <span>
                    <span className="block text-[1.0625rem] font-medium text-white/90 transition-colors group-hover:text-white">
                      {p.title}
                    </span>
                    <span className="text-night-muted mt-1 block text-[0.9375rem]">
                      {p.subtitle}
                    </span>
                  </span>
                  <span className="text-night-muted flex items-center gap-3 text-[0.9375rem]">
                    <span className="hidden sm:inline">
                      {p.tags.join(", ")}
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <AnimatePresence>
            {hovered && (
              <motion.div
                aria-hidden
                key="preview"
                style={{ x: sx, y: sy }}
                className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.22 }}
                  className="bg-ink w-60 overflow-hidden rounded-[4px] border-[5px] border-white shadow-[0_18px_40px_rgb(0_0_0/0.45)]"
                >
                  <ProjectArt
                    variant={hovered.art}
                    className="aspect-[16/10] [&>svg]:size-full"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
