"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { projects } from "~/data/projects";
import { skillGroups } from "~/data/skills";
import { site } from "~/data/site";
import { useActiveSection } from "~/hooks/use-active-section";
import { cn } from "~/lib/cn";

const links = [
  { id: "about", label: "About", count: null },
  { id: "work", label: "Work", count: String(projects.length) },
  { id: "skills", label: "Skills", count: String(skillGroups.length) },
  { id: "experience", label: "Experience", count: "1" },
  { id: "contact", label: "Contact", count: null },
] as const;

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(
    links.map((l) => l.id),
    onHome,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-9 sm:pt-8 lg:px-[3.25rem]"
    >
      <div className="pointer-events-auto relative mx-auto flex max-w-[1380px] items-center justify-between gap-3">
        <Link
          href="/"
          className="pill hidden lg:inline-flex"
          aria-label={`${site.shortName}, back to top`}
        >
          <span className="live-dot" aria-hidden />
          {site.status}
        </Link>
        <Link
          href="/"
          className="pill lg:hidden"
          aria-label={`${site.shortName}, back to top`}
        >
          <span className="live-dot" aria-hidden />
          {site.shortName}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full bg-white/95 px-2 py-1.5 shadow-[var(--shadow-pill)] md:flex"
        >
          {links.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              aria-current={active === l.id ? "location" : undefined}
              className={cn(
                "rounded-full px-2.5 py-1.5 text-[0.8125rem] font-semibold transition-colors lg:px-3.5",
                active === l.id
                  ? "bg-ink text-white"
                  : "text-ink hover:bg-mist",
              )}
            >
              {l.label}
              {l.count && (
                <span
                  className={cn(
                    "ml-1 text-[0.6875rem] font-medium",
                    active === l.id ? "text-white/60" : "text-muted",
                  )}
                >
                  [{l.count}]
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="btn-dark !px-4 !py-2.5 !text-[0.8125rem] whitespace-nowrap"
          >
            Let&apos;s Talk <ArrowUpRight size={15} aria-hidden />
          </Link>
          <button
            type="button"
            className="pill !p-2.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full mt-3 origin-top rounded-xl bg-white p-2 shadow-[var(--shadow-card)] md:hidden"
            >
              {links.map((l) => (
                <Link
                  key={l.id}
                  href={`/#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="hover:bg-mist flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold"
                >
                  {l.label}
                  {l.count && (
                    <span className="text-muted text-xs font-medium">
                      [{l.count}]
                    </span>
                  )}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
