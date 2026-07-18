import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { otherProjectsQuery } from "@/lib/sanity.query";
import type { OtherProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Other Work | Jay",
  metadataBase: new URL("https://jayfolio.dev/other-work"),
  description: "A showcase of volunteer projects, contract work, and other contributions",
  openGraph: {
    title: "Other Work | Jay",
    url: "https://jayfolio.dev/other-work",
    description: "A showcase of volunteer projects, contract work, and other contributions",
  },
};

export default async function OtherWork() {
  const projects: OtherProjectType[] = await sanityFetch({
    query: otherProjectsQuery,
    tags: ["otherProject"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        eyebrow="Other work"
        title="Talks, writing, and open source."
        description="Below are some volunteer projects, contract work, and other interesting contributions I've been a part of."
      />

      {projects.length > 0 ? (
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8 mb-12">
          {projects.map((project, i) => (
            <Slide key={project._id} index={i}>
              <div className="group relative overflow-hidden rounded-lg border border-border hover:border-accent transition-all duration-300">
                <div className="relative h-64 md:h-80 w-full overflow-hidden bg-bg-alt">
                  {project.coverImage?.image ? (
                    <Image
                      src={project.coverImage.image}
                      alt={project.coverImage.alt || project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder={project.coverImage.lqip ? "blur" : "empty"}
                      blurDataURL={project.coverImage.lqip}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-bg-alt">
                      <span className="font-mono text-xs text-ink-faint">product screenshot</span>
                    </div>
                  )}
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-2xl font-bold mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card footer visible always */}
                <div className="bg-card-bg p-4">
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-ink-muted line-clamp-2 mb-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] text-accent bg-accent-soft px-[9px] py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  {project.links && project.links.length > 0 && (
                    <div className="flex gap-2">
                      {project.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-accent hover:underline"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Slide>
          ))}
        </section>
      ) : (
        <div className="border border-dashed border-border rounded-2xl px-10 py-20 flex flex-col items-center text-center gap-5 mb-12">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <span className="absolute w-14 h-14 rounded-full border-[1.5px] border-accent animate-ringPulse" />
            <span className="absolute w-14 h-14 rounded-full border-[1.5px] border-accent animate-ringPulse [animation-delay:0.8s]" />
            <span className="w-3 h-3 rounded-full bg-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 tracking-tight text-ink">Nothing here yet</h2>
            <p className="text-[14.5px] leading-relaxed text-ink-muted max-w-[44ch]">
              Follow along on GitHub or X — new posts and talks get shared there first.
            </p>
          </div>
          <div className="flex gap-3.5">
            <a
              href="https://github.com/Dubjay18"
              className="font-mono text-[13.5px] bg-ink text-bg px-[22px] py-3 rounded-[3px] transition-transform duration-300 hover:-translate-y-0.5"
            >
              github ↗
            </a>
            <a
              href="https://x.com/d_honouredOne"
              className="font-mono text-[13.5px] border border-border text-ink px-[22px] py-3 rounded-[3px] hover:border-accent hover:text-accent transition-colors duration-300"
            >
              x ↗
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
