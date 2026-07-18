import Link from "next/link";
import Image from "next/legacy/image";
import { postsQuery } from "@/lib/sanity.query";
import type { PostType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";

export default async function FeaturedPosts({ params }: { params?: string }) {
  const featuredPosts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["Post"],
  });

  return (
    <>
      {featuredPosts.map((post) =>
        post.featured !== true || post.isPublished !== true ? null : (
          <article
            key={post._id}
            className={`mb-4 ${
              post.slug === params ? "hidden" : "flex lg:flex-row flex-col"
            }`}
          >
            <Link
              href={post.isExternal ? post.externalLink! : `/blog/${post.slug}`}
              target={post.isExternal ? "_blank" : undefined}
              rel={post.isExternal ? "noopener noreferrer" : undefined}
              className="flex flex-col gap-4 bg-card-bg p-5 rounded-lg border border-border hover:border-accent transition-colors duration-200"
            >
              <Image
                src={post.coverImage?.image}
                className="bg-bg-alt rounded-md object-cover"
                alt={post.coverImage?.alt || post.title}
                width={400}
                height={230}
                placeholder={post.coverImage ? "blur" : "empty"}
                blurDataURL={post.coverImage?.lqip || ""}
                quality={100}
                loading="lazy"
              />
              <div className="max-w-lg">
                <h2 className="max-w-sm text-lg tracking-tight mb-4 text-ink">
                  {post.title}
                </h2>
                <p className="text-ink-muted text-sm">
                  {post.description.slice(0, 80).padEnd(83, "...")}
                </p>
              </div>
            </Link>
          </article>
        )
      )}
    </>
  );
}
