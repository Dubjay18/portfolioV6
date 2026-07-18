import Image from "next/image";
import { Metadata } from "next";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import { CustomPortableText } from "../components/shared/CustomPortableText";
import Heroes from "../components/pages/Heroes";
import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../components/shared/RefLink";

export const metadata: Metadata = {
  title: "About | Jay",
  metadataBase: new URL("https://jayfolio.dev/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Jay",
    url: "https://jayfolio.dev/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://res.cloudinary.com/dubinx/image/upload/v1773605074/jay-logo.png",
  },
};

const MILESTONES = [
  {
    num: "01",
    title: "Frontend first, out of necessity",
    body: "Started shipping full Next.js codebases from scratch — component architecture, type contracts, pixel-precise Figma builds.",
  },
  {
    num: "02",
    title: "Pulled toward the backend",
    body: "Found the real satisfaction in schema design and API contracts — modular architecture, structured logging, systems that hold under load.",
  },
  {
    num: "03",
    title: "Now exploring Layer 1",
    body: "Studying decentralized infrastructure and what it changes about how the web gets built, one layer down from the API.",
  },
];

const SKILLS = [
  "TypeScript", "Go", "Node.js", "NestJS", "PostgreSQL", "Prisma",
  "Next.js", "React", "GraphQL", "Docker", "Solidity", "WebSockets", "System Design",
];

export default async function About() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <main className="relative max-w-7xl mx-auto md:px-16 px-6">
      <div key={profile?._id}>
        <section className="grid lg:grid-cols-custom grid-cols-1 gap-x-12 items-center pt-20 pb-14">
          <div className="order-2 lg:order-none">
            <Slide>
              <div className="font-mono text-[13px] text-accent uppercase tracking-[0.08em] mb-3">
                About
              </div>
              <h1 className="font-sans font-extrabold tracking-tight text-[clamp(34px,5vw,58px)] leading-[1.03] mb-6 text-ink">
                I&apos;m {profile?.fullName ?? "John Doe"}. I live in{" "}
                {profile?.location ?? "'X'"}, where I build the future.
              </h1>

              <div className="text-ink-muted leading-relaxed max-w-[58ch]">
                {profile?.fullBio ? (
                  <PortableText
                    value={profile?.fullBio}
                    components={CustomPortableText}
                  />
                ) : (
                  "Your bio information will show up here"
                )}
              </div>

              <div className="flex items-center gap-3.5 mt-8">
                <RefLink
                  href="https://peas-think-9h3.craft.me/JDK9FfS7YJmVDD"
                  className="flex items-center justify-center gap-2 bg-ink text-bg rounded-[3px] py-3 px-6 font-mono text-[13.5px] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  View Résumé <BiLinkExternal className="text-base" />
                </RefLink>
                <a
                  href={`${profile?.resumeURL}?dl=${profile?.fullName}-resume.pdf`}
                  className="flex items-center justify-center border border-border text-ink rounded-[3px] py-3 px-4 hover:border-accent hover:text-accent transition-colors duration-300"
                  title="Download Resume"
                >
                  <BiSolidDownload className="text-lg" aria-label="Download Resume" />
                </a>
              </div>

              {profile?.email && (
                <a
                  href={`mailto:${profile?.email}`}
                  className="flex items-center gap-x-2 text-ink-muted hover:text-accent mt-5 w-fit"
                >
                  <BiEnvelope className="text-lg" />
                  {profile.email}
                </a>
              )}
            </Slide>
          </div>

          <div className="relative justify-self-center order-1 lg:order-none mb-10 lg:mb-0">
            <Slide delay={0.2}>
              <div className="relative w-[260px] h-[260px]">
                <div className="absolute -inset-[18px] rounded-full border-[1.5px] border-dashed border-border animate-ringSpin" />
                {profile?.profileImage?.image ? (
                  <Image
                    className="rounded-full object-cover"
                    src={profile.profileImage.image}
                    width={260}
                    height={260}
                    quality={100}
                    alt={profile.profileImage.alt}
                    placeholder="blur"
                    blurDataURL={profile.profileImage.lqip}
                    priority
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-card-bg" />
                )}
              </div>
            </Slide>
          </div>
        </section>

        <section className="py-14">
          <div className="font-mono text-[13px] text-accent uppercase tracking-[0.08em] mb-2">
            How I got here
          </div>
          <h2 className="font-sans font-bold tracking-tight text-[clamp(24px,3vw,32px)] max-w-[26ch] mb-11 text-ink">
            Three shifts that shaped how I build.
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {MILESTONES.map((m, i) => (
              <Slide key={m.num} index={i}>
                <div>
                  <div className="font-mono text-[26px] text-border mb-3.5">{m.num}</div>
                  <h3 className="text-[19px] font-bold tracking-tight mb-2.5 text-ink">{m.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-ink-muted">{m.body}</p>
                </div>
              </Slide>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="font-mono text-[13px] text-accent uppercase tracking-[0.08em] mb-2">
            Toolbox
          </div>
          <h2 className="font-sans font-bold tracking-tight text-[clamp(24px,3vw,32px)] mb-8 text-ink">
            What I reach for.
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {SKILLS.map((s, i) => (
              <Slide key={s} index={i} stagger={0.04}>
                <span className="font-mono text-[13px] px-4 py-2.5 rounded-[20px] border border-border text-ink-muted hover:text-accent hover:border-accent hover:-translate-y-0.5 transition-all duration-300 inline-block cursor-default">
                  {s}
                </span>
              </Slide>
            ))}
          </div>
        </section>

        <section className="py-14 max-w-3xl">
          <div className="border-l-2 border-accent pl-6">
            <p className="text-[22px] leading-snug font-medium tracking-tight text-ink">
              &quot;I love working across the stack, but my happy place is
              designing clean APIs, scalable systems, and backend logic that
              just works.&quot;
            </p>
          </div>
        </section>

        <Usage />
        <Heroes />
      </div>
    </main>
  );
}
