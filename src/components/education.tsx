import { RevealGroup, RevealItem } from "~/components/reveal";
import { SectionHeading } from "~/components/section-heading";
import { certifications, education } from "~/data/experience";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="panel px-5 pt-10 pb-12 sm:px-10 sm:pt-12 sm:pb-16 lg:px-14"
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            ghost="STUDY"
            title="Education"
            id="education-title"
          />
          <RevealGroup as="ul" delay={0.2} className="mt-10">
            {education.map((e) => (
              <RevealItem
                as="li"
                key={e.institution}
                className="border-line border-t py-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[1.0625rem] font-semibold">
                    {e.program}
                  </h3>
                  <p className="text-sm font-semibold">{e.score}</p>
                </div>
                <p className="text-muted mt-1 text-[0.9375rem]">
                  {e.institution}
                </p>
                <p className="text-muted mt-0.5 text-sm">{e.period}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div>
          <SectionHeading
            ghost="LEARNING"
            small
            title="Certifications"
            id="certifications-title"
          />
          <RevealGroup as="ul" delay={0.2} className="mt-10">
            {certifications.map((c) => (
              <RevealItem
                as="li"
                key={c.title}
                className="border-line border-t py-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 sm:flex-nowrap">
                  <h3 className="min-w-0 text-[1.0625rem] font-semibold">
                    {c.title}
                  </h3>
                  <p
                    className={
                      c.inProgress
                        ? "border-line bg-mist shrink-0 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap"
                        : "text-muted shrink-0 text-sm whitespace-nowrap"
                    }
                  >
                    {c.date}
                  </p>
                </div>
                <p className="text-muted mt-1 text-[0.9375rem]">{c.issuer}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
