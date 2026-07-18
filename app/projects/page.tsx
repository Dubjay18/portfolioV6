import { Metadata } from "next";
import { projectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";
import ProjectsGrid from "../components/pages/ProjectsGrid";

export const metadata: Metadata = {
  title: "Project | Jay",
  metadataBase: new URL("https://jayfolio.dev/projects"),
  description: "Explore projects built by Jay",
  openGraph: {
    title: "Projects | Jay",
    url: "https://jayfolio.dev/projects",
    description: "Explore projects built by Jay",
    images:
      "https://res.cloudinary.com/dubinx/image/upload/v1773605074/jay-logo.png",
  },
};

export default async function Project() {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        eyebrow="Selected work"
        title="Systems I've shipped and stood behind."
        description="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas on how it can be improved."
      />

      {projects.length > 0 ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <EmptyState value="Projects" />
      )}
    </main>
  );
}
