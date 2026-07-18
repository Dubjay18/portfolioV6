import Link from "next/link";
import { postsQuery } from "@/lib/sanity.query";
import { PostType } from "@/types";
import EmptyState from "../shared/EmptyState";
import { BiSolidTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import { HiCalendar } from "react-icons/hi";
import { sanityFetch } from "@/lib/sanity.client";
import { readTime } from "@/app/utils/readTime";
import { toPlainText } from "@portabletext/react";
import { Slide } from "@/app/animation/Slide";

export default async function Posts() {
  const posts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["Post"],
  });

  const published = posts.filter((p) => p.isPublished === true);

  return (
    <section className="max-w-3xl pb-32">
      {published.length > 0 ? (
        <>
          <div className="flex flex-col">
            {published.map((post, i) => (
              <Slide key={post._id} index={i}>
                <Link
                  href={post.isExternal ? post.externalLink! : `/blog/${post.slug}`}
                  target={post.isExternal ? "_blank" : undefined}
                  rel={post.isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-6 py-[26px] px-1 border-b border-border transition-[padding] duration-300 hover:pl-3.5"
                >
                  <div className="flex-1">
                    <div className="font-mono text-xs text-ink-faint mb-2 flex items-center gap-2">
                      <HiCalendar />
                      <time dateTime={post.date ? post.date : post._createdAt}>
                        {post.date ? formatDate(post.date) : formatDate(post._createdAt)}
                      </time>
                      {!post.isExternal && (
                        <>
                          <span>·</span>
                          <BiSolidTime />
                          {readTime(toPlainText(post.body))}
                        </>
                      )}
                      {post.isExternal && (
                        <span className="ml-1 font-mono text-[10px] uppercase tracking-wide text-accent bg-accent-soft px-2 py-0.5 rounded-full">
                          {post.externalSource === "medium" ? "Medium" : post.externalSource === "devto" ? "Dev.to" : "External"}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[19px] font-bold mb-2 tracking-tight text-ink">
                      {post.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-ink-muted max-w-[60ch]">
                      {post.description}
                    </p>
                  </div>
                  <span className="font-mono text-lg text-accent flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </Slide>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-dashed border-border text-center">
            <p className="font-mono text-[13px] text-ink-faint">
              more drafts brewing — check back soon
            </p>
          </div>
        </>
      ) : (
        <EmptyState value="Blog Post" />
      )}
    </section>
  );
}
