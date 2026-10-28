"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section
      role="alert"
      className="panel px-6 pt-36 pb-20 text-center sm:px-10"
    >
      <h1 className="text-[clamp(2rem,6vw,4.5rem)] leading-none font-bold tracking-[-0.035em] uppercase">
        Something went wrong
      </h1>
      <p className="text-ink-soft mx-auto mt-5 max-w-[42ch]">
        The page hit an unexpected problem. Try again, and if it keeps
        happening, reload the page.
      </p>
      <button type="button" onClick={reset} className="btn-dark mt-8">
        Try again
      </button>
    </section>
  );
}
