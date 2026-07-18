import { socialLinks } from "../../data/social";
import RefLink from "./RefLink";

export default function Social({ type }: { type: "social" | "publication" }) {
  return (
    <ul className="flex items-center flex-wrap gap-x-5 gap-y-4 my-10">
      {socialLinks
        .filter((item) => item.status === type)
        .map((value) => (
          <li key={value.id}>
            <RefLink
              href={value.url}
              className="flex items-center gap-2 font-mono text-[13.5px] border border-border text-ink px-6 py-3 rounded-[3px] transition-colors duration-300 hover:border-accent hover:text-accent group"
            >
              <value.icon
                className="flex-shrink-0 h-4 w-4 text-ink-faint group-hover:text-accent duration-300"
                aria-hidden="true"
              />
              {value.name}
            </RefLink>
          </li>
        ))}
    </ul>
  );
}
