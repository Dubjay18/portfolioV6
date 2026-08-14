import Image from "next/image";
import { jobQuery } from "@/lib/sanity.query";
import type { JobType } from "@/types";
import { formatDate } from "../../utils/date";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../shared/RefLink";
import EmptyState from "../shared/EmptyState";
import { RiBriefcase3Fill } from "react-icons/ri";

export default async function Job() {
  const jobs: JobType[] = await sanityFetch({
    query: jobQuery,
    tags: ["job"],
  });

  return (
    <section className="py-16">
      <Slide delay={0.16}>
        <div className="font-mono text-[13px] text-accent uppercase tracking-[0.08em] mb-2">
          Experience
        </div>
        <h2 className="font-sans font-bold tracking-tight text-[clamp(26px,3.4vw,38px)] mb-12 max-w-[20ch] text-ink">
          Work Experience
        </h2>
      </Slide>

      {jobs.length > 0 ? (
        <div className="relative pl-8">
          <div className="absolute left-0 top-[6px] bottom-[6px] w-[2px] bg-border" />
          <div className="flex flex-col gap-y-10">
            {jobs.map((job, i) => (
              <Slide key={job._id} index={i}>
                <div className="relative">
                  <div
                    className="absolute -left-[36px] top-1 w-[11px] h-[11px] rounded-full border-2 border-bg"
                    style={{
                      background: i === 0 ? "oklch(var(--accent))" : "oklch(var(--ink-faint))",
                      boxShadow: "0 0 0 2px oklch(var(--border))",
                    }}
                  />
                  <div className="font-mono text-xs text-ink-faint mb-1">
                    {formatDate(job.startDate)} —{" "}
                    {job.endDate ? formatDate(job.endDate) : (
                      <span className="text-accent">Present</span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2.5 flex-wrap mb-2">
                    <RefLink
                      href={job.url}
                      className="text-xl font-bold tracking-tight text-ink hover:text-accent"
                    >
                      {job.name}
                    </RefLink>
                    <span className="font-mono text-[12.5px] text-accent">{job.jobTitle}</span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink-muted max-w-[70ch] mb-2">
                    {job.description}
                  </p>
                  {job.logo && (
                    <RefLink
                      href={job.url}
                      className="inline-flex items-center gap-2 mt-1 text-xs text-ink-faint hover:text-accent"
                    >
                      <Image
                        src={job.logo}
                        className="object-cover rounded"
                        alt={`${job.name} logo`}
                        width={20}
                        height={20}
                      />
                    </RefLink>
                  )}
                </div>
              </Slide>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={<RiBriefcase3Fill />}
          title="Work Experience Not Provided"
          message="We could not find any work experience at the moment. To add one, visit the Sanity studio to start editing the content."
        />
      )}
    </section>
  );
}
