import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProjectArt } from "~/components/project-art";
import { type Project } from "~/data/projects";
import { cn } from "~/lib/cn";

export function ProjectCard({
  project,
  wide = false,
}: {
  project: Project;
  /** Lays art and text side by side on wide screens (used for an odd last card). */
  wide?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group bg-mist block rounded-[6px] p-1.5 shadow-[var(--shadow-card)] transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgb(0_0_0/0.05),0_18px_40px_rgb(0_0_0/0.12)]",
        wide && "md:grid md:grid-cols-[1.25fr_1fr] md:items-center md:gap-2",
      )}
    >
      <div className="bg-ink relative aspect-[16/10] overflow-hidden rounded-[3px]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <ProjectArt
            variant={project.art}
            className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.03] [&>svg]:size-full"
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[0.6875rem] font-bold tracking-wide uppercase shadow-[var(--shadow-pill)]">
          {project.context}
        </span>
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-white opacity-0 shadow-[var(--shadow-pill)] transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className={wide ? "px-3 pt-4 pb-4 md:px-8" : "px-3 pt-4 pb-4"}>
        <h3 className="text-[1.2rem] leading-snug font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="text-muted mt-1 text-sm">{project.subtitle}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Project tags">
          {project.tags.map((t) => (
            <li
              key={t}
              className="border-line rounded-full border bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold"
            >
              {t}
            </li>
          ))}
          {project.company && (
            <li className="border-line rounded-full border bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold">
              Equippp 3.0 Labs
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}
