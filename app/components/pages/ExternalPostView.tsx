import { ExternalContent } from "@/lib/external-content";
import { formatDate } from "@/app/utils/date";
import { BiSolidTime } from "react-icons/bi";
import { HiCalendar } from "react-icons/hi";
import Link from "next/link";
import Image from "next/legacy/image";

import { urlFor } from "@/lib/sanity.image";
import type { PostType } from "@/types";
import PageHeading from "../shared/PageHeading";

interface ExternalPostViewProps {
  post: PostType;
  externalContent: ExternalContent;
}

export default function ExternalPostView({
  post,
  externalContent,
}: ExternalPostViewProps) {
  const fallbackImage: string =
    "https://res.cloudinary.com/dubinx/image/upload/v1773605074/jay-logo.png";

  return (
    <article>
      <div className="grid lg:grid-cols-[75%,25%] grid-cols-1 relative">
        <div className="min-h-full lg:border-r border-r-0 dark:border-zinc-800 border-zinc-200 pt-10 pb-4 lg:pr-6 px-0">
          <div className="flex items-center flex-wrap gap-4 text-md mb-8 dark:text-zinc-400 text-zinc-600">
            <div className="flex items-center gap-x-2">
              <HiCalendar />
              <time dateTime={post.date ? post.date : post._createdAt}>
                {post.date
                  ? formatDate(post.date)
                  : formatDate(post._createdAt)}
              </time>
            </div>
            <a
              href={externalContent.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-2 dark:text-primary-color text-tertiary-color hover:underline"
            >
              Read on{" "}
              {post.externalSource === "medium"
                ? "Medium"
                : post.externalSource === "devto"
                  ? "Dev.to"
                  : "Original"}
              ↗
            </a>
          </div>

          <PageHeading title={post.title} description={post.description} />

          <div className="relative w-full h-40 pt-[52.5%]">
            <Image
              className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
              layout="fill"
              src={post.coverImage?.image || fallbackImage}
              alt={post.coverImage?.alt || post.title}
              quality={100}
              placeholder={post.coverImage?.lqip ? `blur` : "empty"}
              blurDataURL={post.coverImage?.lqip || ""}
            />
          </div>

          {/* Render external content */}
          <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed tracking-tight text-lg prose dark:prose-invert max-w-none">
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: externalContent.content }}
            />
          </div>

          <div className="mt-8 pt-6 border-t dark:border-zinc-800 border-zinc-200">
            <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-2">
              This article was originally published on{" "}
              <a
                href={externalContent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-primary-color text-tertiary-color hover:underline"
              >
                {post.externalSource === "medium"
                  ? "Medium"
                  : post.externalSource === "devto"
                    ? "Dev.to"
                    : "External Source"}
              </a>
            </p>
          </div>
        </div>

        <aside className="flex flex-col lg:max-h-full h-max gap-y-8 sticky top-2 bottom-auto right-0 py-10 lg:px-6 px-0">
          <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
            <p className="dark:text-zinc-400 text-zinc-500 text-sm">
              Written By
            </p>
            <address className="flex items-center gap-x-3 mt-4 not-italic">
              <div className="relative w-12 h-12">
                <Image
                  src={urlFor(post.author.photo.image)
                    .width(80)
                    .height(80)
                    .url()}
                  alt={post.author.photo.alt}
                  layout="fill"
                  className="dark:bg-zinc-800 bg-zinc-300 rounded-full object-cover"
                />
              </div>
              <div rel="author">
                <h3 className="font-semibold text-lg tracking-tight">
                  {post.author.name}
                </h3>
                <a
                  href={post.author.twitterUrl}
                  className="text-blue-500 text-sm"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {`@${post.author.twitterUrl.split("twitter.com/")[1]}`}
                </a>
              </div>
            </address>
          </section>

          <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
            <h3 className="text-xl font-semibold tracking-tight mb-4">Tags</h3>
            <ul className="flex flex-wrap items-center gap-2 tracking-tight">
              {post.tags.map((tag, id) => (
                <li
                  key={id}
                  className="dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-2 py-1 text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </article>
  );
}
