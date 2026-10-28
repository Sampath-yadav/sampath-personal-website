import { Reveal } from "~/components/reveal";
import { cn } from "~/lib/cn";

/** "/TITLE" heading with a faint oversized word behind it, as in the reference. */
export function SectionHeading({
  ghost,
  title,
  id,
  align = "left",
  small = false,
  className,
}: {
  ghost: string;
  title: string;
  id: string;
  align?: "left" | "center";
  /** Smaller ghost word for narrow columns. */
  small?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* The ghost word settles first, slowly, then the title rises in front of it. */}
      <Reveal
        as="span"
        from={{ y: 28, scale: 0.97 }}
        duration={1.2}
        className={cn(
          "ghost -translate-y-[10%]",
          align === "left" && "ghost-left",
          small && "ghost-sm",
        )}
      >
        <span aria-hidden>{ghost}</span>
      </Reveal>
      <Reveal
        as="h2"
        id={id}
        delay={0.15}
        className={cn(
          "section-title relative pt-[clamp(1.6rem,5.2vw,4.4rem)]",
          align === "center" && "text-center",
        )}
      >
        <span className="mr-0.5 font-light">/</span>
        {title}
      </Reveal>
    </div>
  );
}
