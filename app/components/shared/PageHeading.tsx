import { Slide } from "@/app/animation/Slide";

type HeadingType = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: HeadingType) {
  return (
    <header className="pt-20 pb-8">
      <Slide>
        {eyebrow && (
          <div className="font-mono text-[13px] text-accent uppercase tracking-[0.08em] mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-[16ch] font-sans font-extrabold tracking-tight text-[clamp(32px,5vw,54px)] leading-[1.03] mb-5 text-ink">
          {title}
        </h1>
        <p className="max-w-[58ch] text-[16.5px] leading-relaxed text-ink-muted">
          {description}
        </p>
        {children}
      </Slide>
    </header>
  );
}
