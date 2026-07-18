import Image from "next/image";
import { profileQuery, projectsQuery } from "@/lib/sanity.query";
import type { ProfileType, ProjectType } from "@/types";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import ScrollProgressBar from "./components/shared/ScrollProgressBar";
import TechMarquee from "./components/shared/TechMarquee";
import TypewriterRole from "./components/shared/TypewriterRole";
import KineticHeading from "./components/shared/KineticHeading";
import SpotlightCard from "./components/shared/SpotlightCard";
import HeroBlob from "./components/shared/HeroBlob";
import Link from "next/link";

const ROLES = ["Backend Engineer", "AI Agent Systems in Go", "Full-stack Builder"];

export default async function Home() {
  const [profile, projects] = await Promise.all([
    sanityFetch<ProfileType>({ query: profileQuery, tags: ["profile"] }),
    sanityFetch<ProjectType[]>({ query: projectsQuery, tags: ["project"] }),
  ]);

  const featured = (projects || []).slice(0, 3);

  return (
    <main className="relative">
      <ScrollProgressBar />

      <section className="relative min-h-[calc(100dvh-66px)] flex flex-col justify-center max-w-7xl mx-auto md:px-16 px-6">
        <HeroBlob />

        <div className="font-mono text-[13px] text-accent uppercase tracking-[0.08em] opacity-0 animate-fadeUp [animation-delay:0.1s]">
          Backend-leaning full-stack engineer
        </div>

        <KineticHeading
          text={profile?.headline ?? "Software engineer who thinks in systems."}
          className="font-sans font-extrabold tracking-tight text-[clamp(40px,7vw,88px)] leading-[0.98] my-5 max-w-[15ch] text-ink"
        />

        <div className="opacity-0 animate-fadeUp [animation-delay:0.6s]">
          <TypewriterRole roles={ROLES} />
        </div>

        <p className="max-w-[56ch] text-[17px] leading-relaxed text-ink-muted my-6 opacity-0 animate-fadeUp [animation-delay:0.8s]">
          {profile?.shortBio ??
            "Four years building products that hold up under the hood and feel smooth on the surface."}
        </p>

        <div className="flex items-center gap-4 opacity-0 animate-fadeUp [animation-delay:1s]">
          <Link
            href="/projects"
            className="font-mono text-[13.5px] bg-ink text-bg px-6 py-3 rounded-[3px] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            view projects →
          </Link>
          <Social type="social" />
        </div>
      </section>

      <TechMarquee />

      <div className="max-w-7xl mx-auto md:px-16 px-6">
        <ContributionGraph />
        <Job />

        {featured.length > 0 && (
          <section className="py-16">
            <div className="flex items-baseline justify-between flex-wrap gap-4 mb-10">
              <div>
                <div className="font-mono text-[13px] text-accent uppercase tracking-[0.08em] mb-2">
                  Selected work
                </div>
                <h2 className="font-sans font-bold tracking-tight text-[clamp(26px,3.4vw,38px)] text-ink">
                  Featured projects.
                </h2>
              </div>
              <Link href="/projects" className="font-mono text-[13px] text-accent hover:underline">
                see all →
              </Link>
            </div>
            <div className="grid md:grid-cols-asymmetric grid-cols-1 gap-6">
              {featured.map((p, i) => (
                <Slide key={p._id} index={i} className={i === 0 ? "md:col-span-2" : ""}>
                  <Link href={`/projects/${p.slug}`}>
                    <SpotlightCard>
                      <div className="w-full aspect-[16/10] rounded-[9px] bg-bg-alt mb-5 flex items-center justify-center overflow-hidden">
                        {p.coverImage?.image ? (
                          <Image
                            src={p.coverImage.image}
                            alt={p.coverImage.alt || p.name}
                            width={640}
                            height={400}
                            className="object-cover w-full h-full"
                            placeholder={p.coverImage.lqip ? "blur" : "empty"}
                            blurDataURL={p.coverImage.lqip}
                          />
                        ) : (
                          <span className="font-mono text-xs text-ink-faint">
                            product screenshot
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2 tracking-tight text-ink">{p.name}</h3>
                      <p className="text-[14.5px] leading-relaxed text-ink-muted">{p.tagline}</p>
                    </SpotlightCard>
                  </Link>
                </Slide>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
