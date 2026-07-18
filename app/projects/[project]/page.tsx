import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { singleProjectQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import { sanityFetch } from "@/lib/sanity.client";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";

type Props = {
  params: {
    project: string;
  };
};

const fallbackImage: string =
  "https://res.cloudinary.com/dubinx/image/upload/v1773605074/jay-logo.png";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return {
    title: `${project.name} | Project`,
    metadataBase: new URL(`https://jayfolio.dev/projects/${project.slug}`),
    description: project.tagline,
    openGraph: {
      images: project.coverImage
        ? urlFor(project.coverImage.image).width(1200).height(630).url()
        : fallbackImage,
      url: `https://jayfolio.dev/projects/${project.slug}`,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <Slide>
        <div className="max-w-3xl mx-auto pt-16">
          <Link
            href="/projects"
            className="font-mono text-[13px] text-accent hover:underline inline-flex items-center gap-1.5 mb-8"
          >
            ← back to projects
          </Link>

          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <h1 className="font-sans font-extrabold tracking-tight text-[clamp(30px,4.6vw,46px)] leading-[1.08] max-w-md text-ink">
              {project.name}
            </h1>

            <div className="flex items-center gap-x-2">
              <a
                href={project.projectUrl}
                rel="noreferrer noopener"
                target="_blank"
                className={`flex items-center gap-x-2 border border-border text-ink rounded-md px-4 py-2 duration-200 ${
                  !project.projectUrl
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:border-accent hover:text-accent"
                }`}
              >
                <BiLinkExternal aria-hidden="true" />
                {project.projectUrl ? "Live URL" : "Coming Soon"}
              </a>

              <a
                href={project.repository}
                rel="noreferrer noopener"
                target="_blank"
                className={`flex items-center gap-x-2 border border-border text-ink rounded-md px-4 py-2 duration-200 ${
                  !project.repository
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:border-accent hover:text-accent"
                }`}
              >
                <BiLogoGithub aria-hidden="true" />
                {project.repository ? "GitHub" : "No Repo"}
              </a>
            </div>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11.5px] text-accent bg-accent-soft px-[9px] py-1 rounded-[20px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="relative w-full h-40 pt-[52.5%]">
            <Image
              className="rounded-xl border border-border object-cover"
              fill
              src={project.coverImage?.image ?? fallbackImage}
              alt={project.coverImage?.alt ?? project.name}
              quality={100}
              placeholder={project.coverImage?.lqip ? `blur` : "empty"}
              blurDataURL={project.coverImage?.lqip || ""}
            />
          </div>

          <div className="mt-8 text-ink-muted leading-relaxed">
            <PortableText
              value={project.description}
              components={CustomPortableText}
            />
          </div>
        </div>
      </Slide>
    </main>
  );
}
