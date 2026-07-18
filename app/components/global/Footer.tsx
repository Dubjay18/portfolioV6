import UnmountStudio from "./Unmount";

const SOCIALS = [
  { label: "github", href: "https://github.com/Dubjay18" },
  { label: "x", href: "https://x.com/d_honouredOne" },
  { label: "linkedin", href: "https://linkedin.com/in/dubjay" },
];

export default function Footer() {
  return (
    <UnmountStudio>
      <footer className="border-t border-border mt-32 py-14 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-6 md:px-16 px-6">
          <div className="text-center lg:text-left">
            <div className="font-mono font-semibold text-[15px] mb-2 text-ink">
              jay<span className="text-accent">.</span>dev
            </div>
            <div className="font-mono text-[12.5px] text-ink-faint">
              Built with way too much attention to easing curves.
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-[13px]">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink-muted hover:text-accent transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </UnmountStudio>
  );
}
