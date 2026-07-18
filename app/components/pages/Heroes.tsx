import { heroesQuery } from "@/lib/sanity.query";
import { HeroeType } from "@/types";
import EasterEgg from "../shared/EasterEgg";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../shared/RefLink";

export default async function Heroes() {
  const heroes: HeroeType[] = await sanityFetch({
    query: heroesQuery,
    tags: ["heroe"],
  });

  return (
    <section className="py-16 max-w-5xl">
      <Slide delay={0.17}>
        <h2 className="text-3xl mb-4 font-bold tracking-tight text-ink">Heroes</h2>
        <p className="text-ink-muted max-w-2xl">
          Inspired by{" "}
          <RefLink href="https://rafa.design" className="text-accent underline">
            Rafael Condo&apos;s
          </RefLink>{" "}
          heroes list, here&apos;s my own curated lineup of code conjurers and
          digital dynamos that I&apos;m absolutely stoked to meet someday.{" "}
          <strong className="font-semibold">
            &quot;In no particular order&quot;
          </strong>
        </p>
      </Slide>

      <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-12 tracking-tight">
        {heroes.map((heroe) => (
          <li
            key={heroe._id}
            className="flex items-center gap-x-2 bg-card-bg border border-border rounded-md px-2 py-1"
          >
            <EasterEgg isMet={heroe.met} />
            <RefLink
              href={heroe.url}
              className={`tracking-wide hover:underline ${
                heroe.met ? "text-accent" : "text-ink-muted"
              }`}
            >
              {heroe.name}
            </RefLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
