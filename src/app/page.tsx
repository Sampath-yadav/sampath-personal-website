import { About } from "~/components/about";
import { Contact } from "~/components/contact";
import { Education } from "~/components/education";
import { Experience } from "~/components/experience";
import { Hero } from "~/components/hero";
import { Skills } from "~/components/skills";
import { Work } from "~/components/work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}
