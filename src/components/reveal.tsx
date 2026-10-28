"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Scroll-triggered fade-ins shared by every section.
 *
 * - `Reveal` fades one element up into place the first time it enters view.
 * - `RevealGroup` + `RevealItem` do the same for a list, one item after another.
 *
 * Elements carry `data-reveal` so the <noscript> rule in the root layout can
 * show them when JavaScript is off. Reduced motion is handled globally by the
 * MotionConfig in `MotionProvider` (movement is dropped, only opacity remains).
 */

const ease = [0.2, 0.7, 0.2, 1] as const;
const viewport = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" };

const tags = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
  ul: motion.ul,
  li: motion.li,
  dl: motion.dl,
  section: motion.section,
} as const;
type Tag = keyof typeof tags;

type From = { y?: number; x?: number; scale?: number };

type RevealProps = {
  as?: Tag;
  className?: string;
  children?: React.ReactNode;
  /** Seconds to wait once the element is in view. */
  delay?: number;
  duration?: number;
  /** Where the element starts; it always ends at rest. Defaults to 20px below. */
  from?: From;
  id?: string;
};

export function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
  duration = 0.8,
  from = { y: 20 },
  id,
}: RevealProps) {
  const Tag = tags[as];
  return (
    <Tag
      data-reveal=""
      id={id}
      className={className}
      initial={{ opacity: 0, x: 0, y: 0, scale: 1, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={viewport}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Tag>
  );
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function RevealGroup({
  as = "div",
  className,
  children,
  delay = 0,
  stagger = 0.08,
  ...rest
}: Omit<RevealProps, "from" | "duration"> &
  React.AriaAttributes & {
    stagger?: number;
    role?: string;
  }) {
  const Tag = tags[as];
  return (
    <Tag
      {...rest}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  as = "div",
  className,
  children,
}: {
  as?: Tag;
  className?: string;
  children?: React.ReactNode;
}) {
  const Tag = tags[as];
  return (
    <Tag data-reveal="" className={className} variants={item}>
      {children}
    </Tag>
  );
}

/** Variants for list items that also need their own motion props (e.g. layout). */
export const revealItemVariants = item;
export const revealViewport = viewport;
