import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { projectsGalleryQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Project Gallery | Victor Eke",
  metadataBase: new URL("https://victoreke.com/gallery"),
  description: "A visual showcase of projects I've worked on",
  openGraph: {
    title: "Project Gallery | Victor Eke",
    url: "https://victoreke.com/gallery",
    description: "A visual showcase of projects I've worked on",
  },
};

export default async function Gallery() {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsGalleryQuery,
    tags: ["project"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Project Gallery"
        description="A visual showcase of the projects I've built. Click on any project to see more details."
      />

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="grid lg:grid-cols-2 grid-cols-1 gap-8 mb-12">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project._id}
                className="group relative overflow-hidden rounded-lg border border-transparent dark:hover:border-zinc-600 hover:border-zinc-300 transition-all duration-300"
              >
                <div className="relative h-64 md:h-80 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  {project.coverImage?.image ? (
                    <Image
                      src={project.coverImage.image}
                      alt={project.coverImage.alt || project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder={project.coverImage.lqip ? "blur" : "empty"}
                      blurDataURL={project.coverImage.lqip}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center dark:bg-zinc-800 bg-zinc-200">
                      <span className="text-6xl">📸</span>
                    </div>
                  )}
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-2xl font-bold mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-200 text-sm">{project.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Card footer visible always */}
                <div className="dark:bg-zinc-900 bg-zinc-50 p-4">
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600 line-clamp-2">
                    {project.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
    </main>
  );
}
