export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Responsive interfaces in Next.js, React and Tailwind CSS, from Figma to pixel-perfect code.",
    items: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Next.js",
      "React",
      "Responsive Design",
      "UI/UX (Figma to Code)",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "Type-safe APIs and serverless functions that keep the frontend and the data in sync.",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "tRPC",
      "Serverless Functions (Netlify, n8n)",
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description:
      "Relational schemas and queries I can rely on, with transactions that stay consistent.",
    items: [
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Drizzle ORM",
      "Schema Design",
      "ACID Transactions",
    ],
  },
  {
    id: "ai",
    title: "AI & LLMs",
    description:
      "Conversational and agentic features built on large language models.",
    items: [
      "LLM Integration",
      "Gemini API",
      "Agentic AI",
      "Prompt Engineering",
      "Conversational AI",
    ],
  },
  {
    id: "languages",
    title: "Languages",
    description: "The languages I write most often.",
    items: ["Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    id: "tooling",
    title: "DevOps & Tools",
    description:
      "Version control and automated deployments, so changes ship safely.",
    items: [
      "Git",
      "GitHub",
      "Netlify CI/CD",
      "Automated Deployments",
      "Google OAuth",
    ],
  },
];
