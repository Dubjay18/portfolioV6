import { PortableText } from "@portabletext/react";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { CustomPortableTextFavicon } from "../shared/CustomPortableTextFavicon";
import { sanityFetch } from "@/lib/sanity.client";

export default async function Usage() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <section className="max-w-2xl py-8">
      <div className="mb-8">
        <h2 className="text-3xl mb-4 font-bold tracking-tight text-ink">Usage</h2>
        <p className="text-ink-muted max-w-xl">
          Tools, technologies and gadgets I use on a daily basis but not limited
          to.
        </p>
      </div>
      <PortableText
        value={profile?.usage}
        components={CustomPortableTextFavicon}
      />
    </section>
  );
}
