/** Tiny className joiner: `cn("a", cond && "b")`. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
