export type ProjectTag = "Full-stack" | "AI" | "UI";
export type ArtVariant = "tasks" | "chat" | "landing" | "figma" | "voice";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  /** Short line for the card badge. */
  context: "Internship" | "Project";
  tags: ProjectTag[];
  summary: string;
  highlights: string[];
  /** Employer shown on internship projects. */
  company?: string;
  timeline?: string;
  /** Label for the tech list, because the resume lists one shared stack for the internship. */
  stackLabel: string;
  stack: string[];
  art: ArtVariant;
  /**
   * Optional real screenshot, e.g. "/images/projects/task-manager.webp".
   * Drop the file in /public and set this; otherwise the illustrated cover is used.
   */
  image?: string;
  github?: string;
  live?: string;
};

const INTERNSHIP_STACK = [
  "Next.js",
  "TypeScript",
  "tRPC",
  "Drizzle ORM",
  "PostgreSQL (Supabase)",
  "Tailwind CSS",
  "Google OAuth",
  "Gemini API",
];

const COMPANY = "Equippp 3.0 Labs Technologies";
const TIMELINE = "Oct 2025 - Present";

export const projects: Project[] = [
  {
    slug: "task-manager",
    title: "Task Manager",
    subtitle: "Secure team task management with live dashboards",
    context: "Internship",
    tags: ["Full-stack"],
    summary:
      "A task manager web app built during my internship, with secure sign-in, role-based permissions and a dashboard that updates in real time.",
    highlights: [
      "Secure authentication with role-based authorization, so each person sees and does only what their role allows.",
      "A real-time dashboard that reflects task changes as they happen.",
    ],
    company: COMPANY,
    timeline: TIMELINE,
    stackLabel: "Internship stack",
    stack: INTERNSHIP_STACK,
    art: "tasks",
  },
  {
    slug: "website-ai-chatbot",
    title: "Website AI Chatbot",
    subtitle: "A chatbot that takes visitors to the right page",
    context: "Internship",
    tags: ["AI", "Full-stack"],
    summary:
      "An AI-powered chatbot for the company website, with intelligent page routing that helps visitors reach the right page faster.",
    highlights: [
      "Intelligent page routing that improves how visitors navigate the site.",
      "Built for the company's own website as part of my internship.",
    ],
    company: COMPANY,
    timeline: TIMELINE,
    stackLabel: "Internship stack",
    stack: INTERNSHIP_STACK,
    art: "chat",
  },
  {
    slug: "revision-prep-landing-page",
    title: "Revision Prep Landing Page",
    subtitle: "A mobile-responsive landing page for Revision Prep",
    context: "Internship",
    tags: ["UI"],
    summary:
      "A mobile-responsive landing page for the Revision Prep project, tuned to look and work well on every screen size.",
    highlights: [
      "A responsive layout optimized across all devices.",
      "Delivered for the Revision Prep project during my internship.",
    ],
    company: COMPANY,
    timeline: TIMELINE,
    stackLabel: "Internship stack",
    stack: INTERNSHIP_STACK,
    art: "landing",
  },
  {
    slug: "figma-to-code-mobile-ui",
    title: "Figma to Code, Mobile UI",
    subtitle: "Pixel-perfect mobile interfaces from design files",
    context: "Internship",
    tags: ["UI"],
    summary:
      "Production-ready UI code for mobile applications, converted from Figma designs with pixel-perfect implementation.",
    highlights: [
      "Faithful translation of Figma designs into production-ready interface code.",
      "Pixel-perfect implementation for mobile applications.",
    ],
    company: COMPANY,
    timeline: TIMELINE,
    stackLabel: "Internship stack",
    stack: INTERNSHIP_STACK,
    art: "figma",
  },
  {
    slug: "sahay",
    title: "Sahay",
    subtitle: "Conversational AI for automated appointment scheduling",
    context: "Project",
    tags: ["AI", "Full-stack"],
    summary:
      "A voice and web-based AI agent that automates appointment scheduling through natural-language conversations, handling 100+ appointments a day.",
    highlights: [
      "Automates 100+ daily appointments through LLM-driven natural-language workflows.",
      "Serverless backend designed for reliable natural-language-to-database operations and scalable request handling.",
    ],
    stackLabel: "Tech stack",
    stack: ["TypeScript", "PostgreSQL", "Gemini API", "Netlify Functions"],
    art: "voice",
  },
];

export const projectFilters = ["All", "Full-stack", "AI", "UI"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
