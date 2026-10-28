import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GithubIcon } from "~/components/icons";
import { ProjectArt } from "~/components/project-art";
import { Reveal, RevealGroup, RevealItem } from "~/components/reveal";
import { getAdjacentProject, getProject, projects } from "~/data/projects";
import { site } from "~/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${site.shortName}`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getAdjacentProject(project.slug);

  return (
    <>
      <article
        aria-labelledby="project-title"
        className="panel px-5 pt-28 pb-12 sm:px-10 sm:pt-32 sm:pb-16 lg:px-14"
      >
        <Reveal from={{ y: 12 }}>
          <Link href="/#work" className="pill">
            <ArrowLeft size={15} aria-hidden /> All work
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2" aria-label="Project tags">
              {[...project.tags, project.context].map((t) => (
                <li
                  key={t}
                  className="border-line rounded-full border bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold shadow-[var(--shadow-pill)]"
                >
                  {t}
                </li>
              ))}
            </ul>
            <h1
              id="project-title"
              className="mt-6 text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] font-bold tracking-[-0.035em]"
            >
              {project.title}
            </h1>
            <p className="text-muted mt-3 text-lg">{project.subtitle}</p>
            <p className="text-ink-soft mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed">
              {project.summary}
            </p>
            {(project.live ?? project.github) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark"
                  >
                    View live <ArrowUpRight size={16} aria-hidden />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill !py-3"
                  >
                    <GithubIcon size={16} /> Source code
                  </a>
                )}
              </div>
            )}
          </Reveal>

          <RevealGroup
            as="dl"
            delay={0.3}
            className="self-end text-[0.9375rem]"
          >
            {project.company && (
              <RevealItem className="border-line border-t py-4">
                <dt className="text-muted text-sm">Where</dt>
                <dd className="mt-1 font-semibold">{project.company}</dd>
              </RevealItem>
            )}
            {project.timeline && (
              <RevealItem className="border-line border-t py-4">
                <dt className="text-muted text-sm">Timeline</dt>
                <dd className="mt-1 font-semibold">{project.timeline}</dd>
              </RevealItem>
            )}
            <RevealItem className="border-line border-t py-4">
              <dt className="text-muted text-sm">{project.stackLabel}</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="border-line bg-mist rounded-full border px-3 py-1.5 text-[0.8125rem] font-semibold"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </RevealItem>
          </RevealGroup>
        </div>

        <Reveal
          delay={0.2}
          from={{ y: 28 }}
          duration={1}
          className="bg-mist mt-12 overflow-hidden rounded-[6px] p-1.5 shadow-[var(--shadow-card)] lg:mt-16"
        >
          <div className="bg-ink relative aspect-[16/10] overflow-hidden rounded-[3px] md:aspect-[16/8]">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="90vw"
                className="object-cover"
                priority
              />
            ) : (
              <ProjectArt
                variant={project.art}
                className="size-full [&>svg]:size-full"
              />
            )}
          </div>
        </Reveal>

        <section aria-labelledby="highlights-title" className="mt-12 lg:mt-16">
          <Reveal
            as="h2"
            id="highlights-title"
            className="text-2xl font-semibold tracking-tight"
          >
            What I did
          </Reveal>
          <RevealGroup as="ul" delay={0.1} className="mt-5 max-w-[62ch]">
            {project.highlights.map((h) => (
              <RevealItem
                as="li"
                key={h}
                className="border-line border-t py-4 text-[1.0625rem] leading-relaxed"
              >
                {h}
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </article>

      <section
        aria-label="Next project"
        className="panel px-5 py-8 sm:px-10 lg:px-14"
      >
        <Reveal>
          <Link
            href={`/work/${next?.slug ?? ""}`}
            className="group flex items-center justify-between gap-6"
          >
            <span>
              <span className="text-muted block text-sm">Next project</span>
              <span className="mt-1 block text-[clamp(1.6rem,3.6vw,3rem)] leading-tight font-medium tracking-[-0.02em] uppercase">
                {next?.title}
              </span>
            </span>
            <ArrowUpRight
              size={36}
              strokeWidth={1.5}
              aria-hidden
              className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
