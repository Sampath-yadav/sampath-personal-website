import { Reveal, RevealGroup, RevealItem } from "~/components/reveal";
import { SectionHeading } from "~/components/section-heading";
import { about } from "~/data/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="panel px-6 pt-10 pb-12 sm:px-10 sm:pt-12 sm:pb-16 lg:px-14"
    >
      <SectionHeading ghost="ABOUT" title="About" id="about-title" />
      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <Reveal
          as="p"
          delay={0.1}
          className="max-w-[34ch] text-[clamp(1.5rem,2.7vw,2.4rem)] leading-[1.2] font-medium tracking-[-0.02em] text-balance"
        >
          {about.statement}
        </Reveal>
        <RevealGroup as="dl" delay={0.25} className="self-end">
          {about.facts.map((f) => (
            <RevealItem
              key={f.label}
              className="border-line grid grid-cols-[6.5rem_1fr] gap-4 border-t py-4 first:border-t-0 sm:grid-cols-[8rem_1fr]"
            >
              <dt className="text-muted text-sm">{f.label}</dt>
              <dd className="text-[0.9375rem] font-semibold">{f.value}</dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
