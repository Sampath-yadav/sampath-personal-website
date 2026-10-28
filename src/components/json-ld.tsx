import { env } from "~/env";
import { getSocialLinks, site } from "~/data/site";

/** Structured data so search engines understand who this site is about. */
export function JsonLd() {
  const sameAs = getSocialLinks()
    .filter((l) => l.external && l.label !== "Resume")
    .map((l) => l.href);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: site.email,
    url: env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "MLR Institute of Technology",
    },
    worksFor: {
      "@type": "Organization",
      name: "Equippp 3.0 Labs Technologies Pvt. Ltd.",
    },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
