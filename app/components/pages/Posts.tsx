import Image from "next/legacy/image";
import Link from "next/link";
import { postsQuery } from "@/lib/sanity.query";
import { PostType } from "@/types";
import EmptyState from "../shared/EmptyState";
import { BiSolidTime, BiTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import { HiCalendar } from "react-icons/hi";
import { sanityFetch } from "@/lib/sanity.client";
import { readTime } from "@/app/utils/readTime";
import { toPlainText } from "@portabletext/react";

const fallbackImage: string =
  "https://res.cloudinary.com/victoreke/image/upload/v1692608339/victoreke/blog.png";

export default async function Posts() {
  const posts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["Post"],
  });

  return (
    <section>
      {posts.length > 0 ? (
        <div className="flex flex-col lg:max-w-[950px] max-w-full lg:gap-y-8 gap-y-12 mb-12">
          {posts.map((post) =>
            post.isPublished !== true ? null : (
              <article key={post._id}>
                <Link
                  href={post.isExternal ? post.externalLink! : `/blog/${post.slug}`}
                  target={post.isExternal ? "_blank" : undefined}
                  rel={post.isExternal ? "noopener noreferrer" : undefined}
                  className="flex lg:flex-row flex-col lg:items-center items-start gap-8 dark:bg-primary-bg bg-secondary-bg p-6 rounded-lg border dark:border-zinc-800 border-zinc-200 group"
                >
                  <div className="relative lg:w-[450px] lg:h-52 w-full h-56 overflow-clip">
                    <Image
                      src={post.coverImage?.image || fallbackImage}
                      className="dark:bg-zinc-800 bg-zinc-100 rounded-md object-cover group-hover:scale-125 duration-300"
                      alt={post.coverImage?.alt || post.title}
                      layout="fill"
                      placeholder={post.coverImage ? "blur" : "empty"}
                      blurDataURL={post.coverImage?.lqip || ""}
                    />
                  </div>
                  <div className="max-w-lg">
                    <div className="flex items-center gap-x-2 mb-2">
                      <h2 className="max-w-sm text-2xl font-semibold tracking-tight">
                        {post.title}
                      </h2>
                      {post.isExternal && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100">
                          {post.externalSource === "medium"
                            ? "Medium"
                            : post.externalSource === "devto"
                              ? "Dev.to"
                              : "External"}
                        </span>
                      )}
                    </div>
                    <p className="dark:text-zinc-400 text-zinc-600 text-[0.95rem]">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-x-4 mt-3 text-sm">
                      <div className="flex items-center gap-x-2">
                        <HiCalendar />
                        <time
                          dateTime={post.date ? post.date : post._createdAt}
                        >
                          {post.date
                            ? formatDate(post.date)
                            : formatDate(post._createdAt)}
                        </time>
                      </div>
                      {!post.isExternal && (
                        <div className="flex items-center gap-x-2">
                          <BiSolidTime />
                          <div className="">
                            {readTime(toPlainText(post.body))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            )
          )}
        </div>
      ) : (
        <EmptyState value="Blog Post" />
      )}
    </section>
  );
}
