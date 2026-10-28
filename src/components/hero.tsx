"use client";

import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Box,
  Briefcase,
  CodeXml,
  Download,
  Layers,
  Mail,
  Mouse,
} from "lucide-react";
import { useRef } from "react";

import { GithubIcon, LinkedinIcon } from "~/components/icons";
import { PortraitReveal } from "~/components/portrait-reveal";
import { projects } from "~/data/projects";
import { getSocialLinks, site, type SocialLink } from "~/data/site";

const ease = [0.2, 0.7, 0.2, 1] as const;

/**
 * Entrance choreography, in seconds from first paint. The header (a separate
 * component) settles first, then the hero builds from the top-left outwards and
 * finishes with the decorative pieces. Movement stays within 12-24px.
 */
const t = {
  eyebrow: 0.3,
  first: 0.45,
  last: 0.75,
  copy: 1.0,
  buttons: 1.15,
  portrait: 1.3,
  socials: 1.75,
  stats: 1.85,
  accent: 2.0,
  card: 2.15,
  cue: 2.3,
} as const;

const rise = (delay: number, y = 16, duration = 0.7) =>
  ({
    initial: { y, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration, delay, ease },
  }) as const;

const word: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
};
const letter: Variants = {
  hidden: { y: "0.3em", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease } },
};

function Letters({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.span
      variants={word}
      custom={delay}
      initial="hidden"
      animate="show"
      className={className}
      aria-hidden
    >
      {text.split("").map((c, i) => (
        <motion.span key={i} variants={letter} className="inline-block">
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

const socialIcons = {
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
  Email: Mail,
} as const;

/** Every figure is derived from the portfolio data, so it stays honest as that data changes. */
function getStats() {
  const technologies = new Set(projects.flatMap((p) => p.stack)).size;
  const start = new Date(site.careerStart);
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);

  return [
    { icon: Box, value: `${projects.length}+`, label: "Projects Built" },
    {
      icon: Briefcase,
      value: years >= 1 ? `${years}+` : "<1",
      label: "Years Experience",
    },
    { icon: CodeXml, value: `${technologies}+`, label: "Technologies" },
    { icon: Layers, value: `${site.domains.length}+`, label: "Domains" },
  ];
}

function HeroSocial({ link }: { link: SocialLink }) {
  if (link.label === "Resume") return null;
  const Icon = socialIcons[link.label];
  return (
    <a
      href={link.href}
      className="icon-btn"
      aria-label={link.label}
      {...(link.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <Icon size={19} aria-hidden />
    </a>
  );
}

/** Thin tilted ellipse that sits behind the portrait, with one dot riding it. */
function Orbit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 42"
      fill="none"
      aria-hidden
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id="orbit-stroke"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="100"
          y2="0"
        >
          <stop offset="0" stopColor="#111" />
          <stop offset="1" stopColor="#cfcfcf" />
        </linearGradient>
      </defs>
      <g transform="rotate(-16 50 21)">
        <ellipse
          cx="50"
          cy="21"
          rx="50"
          ry="11"
          stroke="url(#orbit-stroke)"
          strokeWidth="0.28"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="91" cy="27.3" r="1.1" fill="#111" />
      </g>
    </svg>
  );
}

function HandArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M72 6 C74 44 52 78 10 90" />
      <path d="M26 78 L9 90 L28 96" />
    </svg>
  );
}

function SocialList({ className }: { className?: string }) {
  const socials = getSocialLinks();
  return (
    <ul className={className} aria-label="Profiles and contact">
      {socials.map((s) => (
        <li key={s.label}>
          <HeroSocial link={s} />
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  const stats = getStats();
  const ref = useRef<HTMLElement>(null);

  /**
   * Vanish-shade: as the hero scrolls out, its content eases to transparent
   * and drifts up a little, while a veil in the hero's own paper colour rises
   * from the bottom edge so the sheet melts into the page. All of it is driven
   * by motion values, so scrolling never re-renders React. Reduced motion
   * switches it off in CSS (see `.hero-scroll`), which keeps SSR and the
   * first client render identical.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0.2, 0.85], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const veil = useTransform(scrollYProgress, [0.05, 0.75], [0, 1]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        id="top"
        aria-labelledby="hero-title"
        className="panel hero-panel flex flex-col overflow-hidden"
      >
        <div className="hero-clouds" aria-hidden />

        <motion.div
          style={{ opacity: fade, y: lift }}
          className="hero-scroll relative z-10 flex flex-1 flex-col"
        >
          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr]">
            {/* Intro: label, name, role, copy, calls to action */}
            <div className="z-20 px-6 pt-24 sm:px-10 sm:pt-28 lg:col-start-1 lg:row-start-1 lg:pt-[5.5rem] lg:pr-0 lg:pl-[clamp(3.5rem,6.2vw,7rem)]">
              <motion.p
                {...rise(t.eyebrow, 12, 0.6)}
                className="text-muted text-[0.8125rem] font-medium tracking-[0.42em] uppercase"
              >
                Hello, I&apos;m
              </motion.p>

              <h1 id="hero-title" className="hero-name mt-4 lg:mt-5">
                <span className="sr-only">{site.name}</span>
                <span className="block whitespace-nowrap">
                  <Letters
                    text={site.firstName.toUpperCase()}
                    delay={t.first}
                    className="outline-text"
                  />
                </span>
                <span className="block whitespace-nowrap">
                  <Letters text={site.lastName.toUpperCase()} delay={t.last} />
                </span>
              </h1>

              <motion.div {...rise(t.copy)}>
                <p className="mt-6 text-[clamp(1.3rem,1.55vw,1.85rem)] leading-tight font-bold tracking-tight lg:mt-7">
                  {site.role}
                  <span className="text-line mx-3 font-light" aria-hidden>
                    |
                  </span>
                  <span className="text-muted">{site.focus}</span>
                </p>
                <p className="text-ink-soft mt-3 max-w-[31rem] text-base leading-relaxed lg:text-[clamp(0.95rem,1vw,1.1rem)]">
                  {site.heroIntro}
                </p>
              </motion.div>

              <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-7">
                <motion.a
                  {...rise(t.buttons)}
                  href="#work"
                  className="btn-dark"
                >
                  Explore My Work <ArrowUpRight size={16} aria-hidden />
                </motion.a>
                <motion.a
                  {...rise(t.buttons + 0.1)}
                  href={site.resumeUrl}
                  download
                  className="btn-light"
                >
                  Download Resume <Download size={16} aria-hidden />
                  <span className="sr-only"> (PDF)</span>
                </motion.a>
                <motion.div {...rise(t.socials, 12)} className="lg:hidden">
                  <SocialList className="flex gap-2" />
                </motion.div>
              </div>
            </div>

            {/* Portrait with its circle and orbit */}
            <motion.div
              {...rise(t.portrait, 24, 1)}
              className="hero-portrait mt-6 max-lg:relative max-lg:mx-auto max-lg:w-[min(92vw,26rem)] lg:mt-0"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute top-[8%] left-[19%] aspect-square w-[62%] rounded-full bg-[radial-gradient(circle_at_50%_30%,#f1f1ef,#e6e6e3)] opacity-90"
              />
              <Orbit className="pointer-events-none absolute top-[26%] left-[13%] w-[78%]" />
              <PortraitReveal />
            </motion.div>

            {/* Stats */}
            <div className="z-20 px-6 pb-8 max-lg:relative max-lg:-mt-6 sm:px-10 lg:col-start-1 lg:row-start-2 lg:self-end lg:pt-6 lg:pr-0 lg:pb-12 lg:pl-[clamp(3.5rem,6.2vw,7rem)]">
              <motion.ul
                {...rise(t.stats)}
                aria-label="At a glance"
                className="grid max-w-[40rem] grid-cols-2 gap-y-6 rounded-3xl bg-white px-2 py-5 shadow-[var(--shadow-card)] sm:grid-cols-4 sm:px-3"
              >
                {stats.map((s) => (
                  <li
                    key={s.label}
                    className="border-line px-4 even:border-l sm:border-l sm:first:border-l-0"
                  >
                    <s.icon size={20} strokeWidth={1.6} aria-hidden />
                    <p className="mt-2 text-xl leading-none font-bold tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-muted mt-1.5 text-[0.8125rem]">
                      {s.label}
                    </p>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* Desktop-only pieces, positioned against the hero sheet */}
          <motion.div
            {...rise(t.socials, 12)}
            className="absolute top-[30%] right-5 z-30 hidden lg:block"
          >
            <SocialList className="flex flex-col gap-2" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: t.accent, ease }}
            aria-hidden
            className="text-ink-soft pointer-events-none absolute top-[8%] left-[47%] z-20 hidden xl:block"
          >
            <p className="hand -rotate-[8deg] text-[1.3rem] leading-snug">
              {site.tagline[0]}
              <br />
              {site.tagline[1]}
            </p>
            <HandArrow className="mt-1 ml-[7rem] h-[4.5rem] w-[4rem] -scale-x-100" />
          </motion.div>

          <motion.div
            {...rise(t.card)}
            className="absolute right-[4%] bottom-[11%] z-20 hidden rounded-3xl bg-white/90 px-6 py-4 shadow-[var(--shadow-card)] backdrop-blur-sm lg:block"
          >
            <p className="flex items-center gap-3 text-[0.9375rem]">
              <span className="live-dot shrink-0" aria-hidden />
              {site.availability.lead}
            </p>
            <p className="mt-0.5 pl-5 text-lg leading-tight font-bold">
              {site.availability.headline}
            </p>
            <p className="text-muted mt-1.5 pl-5 text-[0.8125rem]">
              {site.availability.types.join(" | ")}
            </p>
          </motion.div>

          <motion.a
            {...rise(t.cue, 12)}
            href="#about"
            className="text-muted hover:text-ink absolute bottom-4 left-[2.5%] z-20 hidden items-end gap-8 text-[0.6875rem] font-medium tracking-[0.32em] uppercase transition-colors lg:flex"
          >
            <Mouse size={30} strokeWidth={1.3} aria-hidden />
            Scroll to explore
          </motion.a>
        </motion.div>

        {/* Veil: the hero's paper colour rising from the bottom edge on scroll. */}
        <motion.div
          aria-hidden
          style={{ opacity: veil }}
          className="hero-veil"
        />
      </section>
    </MotionConfig>
  );
}
