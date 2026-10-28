export const experience = {
  company: "Equippp 3.0 Labs Technologies Pvt. Ltd.",
  shortCompany: "Equippp 3.0 Labs",
  location: "Hyderabad",
  role: "Software Development Intern",
  period: "Oct 2025 - Now",
  summary:
    "Developed and deployed full-stack web applications across multiple production-grade projects, working with cross-functional teams to design, build and integrate features into live company platforms. Applied programming and database concepts to improve backend workflows, APIs and application features, with hands-on experience in Agile workflows, version control, code reviews and CI/CD deployments.",
} as const;

export type Education = {
  institution: string;
  program: string;
  period: string;
  score: string;
};

export const education: Education[] = [
  {
    institution: "MLR Institute of Technology, Hyderabad",
    program: "B.Tech in Data Science",
    period: "Sep 2023 - Jul 2026",
    score: "GPA 8.95/10",
  },
  {
    institution: "Government Polytechnic College, Jogipet",
    program: "Diploma in Mechanical Engineering",
    period: "Aug 2020 - Aug 2023",
    score: "GPA 9.44/10",
  },
  {
    institution: "Newton's High School, Banswada",
    program: "SSC",
    period: "Jun 2010 - Jun 2020",
    score: "GPA 10/10",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  inProgress?: boolean;
};

export const certifications: Certification[] = [
  {
    title: "Java Full Stack",
    issuer: "Wipro TalentNext (Digital Skills Readiness Program)",
    date: "Oct 2025",
  },
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "In progress (Nov 2025)",
    inProgress: true,
  },
  {
    title: "OCI AI Foundations Associate",
    issuer: "Oracle",
    date: "In progress (Oct 2025)",
    inProgress: true,
  },
  { title: "Core Java", issuer: "Infosys Springboard", date: "Dec 2023" },
  { title: "Web Development", issuer: "Eduskills Academy", date: "Nov 2023" },
];
