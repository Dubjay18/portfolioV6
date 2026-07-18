const STACK = [
  "TypeScript",
  "Go",
  "Next.js",
  "PostgreSQL",
  "Prisma",
  "NestJS",
  "GraphQL",
  "Solidity",
  "Docker",
  "Vercel",
];

export default function TechMarquee() {
  const items = [...STACK, ...STACK];
  return (
    <div className="border-y border-border py-[22px] overflow-hidden bg-bg-alt">
      <div className="flex w-max gap-14 animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm text-ink-muted whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
