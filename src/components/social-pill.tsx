import { ArrowUpRight, Download, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "~/components/icons";
import { type SocialLink } from "~/data/site";

const icons = {
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
  Email: Mail,
  Resume: Download,
} as const;

export function SocialPill({ link }: { link: SocialLink }) {
  const Icon = icons[link.label];
  return (
    <a
      href={link.href}
      className="pill"
      {...(link.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...(link.label === "Resume" ? { download: true } : {})}
    >
      <Icon size={15} aria-hidden />
      {link.label}
      <span className="sr-only">
        {link.external ? " (opens in a new tab)" : ""}
      </span>
      <ArrowUpRight size={13} aria-hidden className="opacity-40" />
    </a>
  );
}
