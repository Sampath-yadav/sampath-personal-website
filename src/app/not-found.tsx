import Link from "next/link";

export default function NotFound() {
  return (
    <section className="panel px-6 pt-36 pb-20 text-center sm:px-10">
      <h1 className="text-[clamp(2.4rem,7vw,5.5rem)] leading-none font-bold tracking-[-0.035em] uppercase">
        Page not found
      </h1>
      <p className="text-ink-soft mx-auto mt-5 max-w-[42ch]">
        That link doesn&apos;t lead anywhere. Head back to the portfolio to see
        the projects.
      </p>
      <Link href="/" className="btn-dark mt-8">
        Back to home
      </Link>
    </section>
  );
}
