"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { ProjectCard } from "~/components/project-card";
import {
  Reveal,
  revealItemVariants,
  revealViewport,
} from "~/components/reveal";
import { SectionHeading } from "~/components/section-heading";
import { projectFilters, projects, type ProjectFilter } from "~/data/projects";
import { cn } from "~/lib/cn";

export function Work() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="panel px-5 pt-10 pb-12 sm:px-10 sm:pt-12 sm:pb-16 lg:px-14"
    >
      <SectionHeading
        ghost="PORTFOLIO"
        title="Selected work"
        id="work-title"
        align="center"
      />

      <Reveal
        delay={0.2}
        className="mt-10 flex flex-wrap items-center justify-between gap-4 lg:mt-14"
      >
        <div role="group" aria-label="Filter projects" className="flex gap-1">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                filter === f ? "bg-ink text-white" : "text-ink hover:bg-mist",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-muted text-sm" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </Reveal>

      {/* Cards stagger in the first time the grid scrolls into view; after that,
          filtering fades cards in and out in place. */}
      <motion.ul
        layout
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
        }}
        className="mt-6 grid gap-5 md:grid-cols-2 lg:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              className={
                visible.length % 2 === 1 && i === visible.length - 1
                  ? "md:col-span-2"
                  : undefined
              }
              data-reveal=""
              variants={revealItemVariants}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <ProjectCard
                project={p}
                wide={visible.length % 2 === 1 && i === visible.length - 1}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="text-muted mt-10 text-center">
          No projects match this filter yet. Try &ldquo;All&rdquo;.
        </p>
      )}
    </section>
  );
}
