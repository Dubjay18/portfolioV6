import ContributionGraph from "./ContributionGraph";
import { Slide } from "@/app/animation/Slide";

export default function GithubCalendarComponent() {
  return (
    <section className="py-16">
      <Slide delay={0.16}>
        <div className="font-mono text-[13px] text-accent uppercase tracking-[0.08em] mb-2">
          Activity
        </div>
        <h2 className="font-sans font-bold tracking-tight text-[clamp(26px,3.4vw,38px)] mb-8 text-ink">
          Shipping, most days.
        </h2>
      </Slide>

      <Slide delay={0.18}>
        <ContributionGraph />
      </Slide>
    </section>
  );
}
