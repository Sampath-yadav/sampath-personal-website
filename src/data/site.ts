/**
 * Single source of truth for personal details.
 * Everything here comes from the resume, except the two social URLs below,
 * which the resume does not contain (its LinkedIn/GitHub links only point to
 * the generic linkedin.com and github.com home pages).
 */
export const site = {
  name: "Sampath Yadav Gundaram",
  shortName: "Sampath Yadav",
  firstName: "Sampath",
  lastName: "Yadav",
  role: "Full-Stack Developer",
  /** Second half of the hero subtitle, e.g. "Full-Stack Developer | AI & Automation". */
  focus: "AI & Automation",
  intro:
    "I build fast, type-safe web apps and AI-powered products, from Figma designs to production.",
  heroIntro:
    "I build fast, scalable web applications and AI-powered products, from idea to production. I enjoy solving real-world problems with clean code and user-focused design.",
  tagline: ["Turning ideas", "into real products"],
  location: "Hyderabad, Telangana, India",
  email: "sampath.20304m040@gmail.com",
  status: "Available for New Opportunities",
  /** Hero availability card. Edit the engagement types to match what you actually want. */
  availability: {
    lead: "Open to",
    headline: "New Opportunities",
    types: ["Full-time", "Remote", "Part-time"],
  },
  /** Used for the "Years Experience" stat (first internship, Oct 2025). */
  careerStart: "2025-10-01",
  /** Used for the "Domains" stat. */
  domains: ["Full-stack web apps", "Conversational AI"],
  resumeUrl: "/Sampath_Yadav_Resume.pdf",
  /**
   * TODO: paste your real profile URLs here, for example
   * "https://www.linkedin.com/in/your-handle" and "https://github.com/your-handle".
   * Links left empty are hidden automatically.
   */
  linkedin: "",
  github: "",
} as const;

export type SocialLink = {
  label: "LinkedIn" | "GitHub" | "Email" | "Resume";
  href: string;
  external: boolean;
};

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (site.linkedin)
    links.push({ label: "LinkedIn", href: site.linkedin, external: true });
  if (site.github)
    links.push({ label: "GitHub", href: site.github, external: true });
  links.push({ label: "Email", href: `mailto:${site.email}`, external: false });
  links.push({ label: "Resume", href: site.resumeUrl, external: true });
  return links;
}

export const about = {
  statement:
    "I'm a software developer who enjoys turning rough ideas into reliable products. I work across the stack with Next.js, TypeScript, tRPC and PostgreSQL, and I like adding AI where it genuinely helps people get things done.",
  facts: [
    { label: "Based in", value: "Hyderabad, India" },
    {
      label: "Right now",
      value: "Software Development Intern at Equippp 3.0 Labs",
    },
    {
      label: "Studied",
      value: "B.Tech in Data Science, MLR Institute of Technology",
    },
    { label: "Focus", value: "Full-stack web apps and conversational AI" },
  ],
} as const;
