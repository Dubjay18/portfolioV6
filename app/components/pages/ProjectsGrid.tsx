"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ProjectType } from "@/types";
import { Slide } from "@/app/animation/Slide";
import SpotlightCard from "../shared/SpotlightCard";

export default function ProjectsGrid({ projects }: { projects: ProjectType[] }) {
  const [filter, setFilter] = useState("all");

  const filters = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return ["all", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => (p.tags || []).includes(filter));
  }, [projects, filter]);

  return (
    <>
      <div className="flex gap-2.5 flex-wrap mb-12">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[13px] px-[18px] py-[9px] rounded-[20px] border transition-all duration-300 ${
                active
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-ink-muted hover:text-accent hover:border-accent"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <section className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-12">
        {filtered.map((project, i) => (
          <Slide key={project._id} index={i}>
            <Link href={`/projects/${project.slug}`}>
              <SpotlightCard>
                <div className="w-full aspect-[16/10] rounded-[9px] bg-bg-alt mb-5 flex items-center justify-center overflow-hidden">
                  {project.coverImage?.image ? (
                    <Image
                      src={project.coverImage.image}
                      alt={project.coverImage.alt || project.name}
                      width={640}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="font-mono text-xs text-ink-faint">
                      product screenshot
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight text-ink">
                  {project.name}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-ink-muted mb-4">
                  {project.tagline}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11.5px] text-accent bg-accent-soft px-[9px] py-1 rounded-[20px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </Link>
          </Slide>
        ))}
      </section>
    </>
  );
}
