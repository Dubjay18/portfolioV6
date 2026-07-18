import { Metadata } from "next";
import Posts from "../components/pages/Posts";
import Social from "../components/shared/Social";
import PageHeading from "@/app/components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Blog | Jay",
  metadataBase: new URL("https://jayfolio.dev/blog"),
  description: "Read latest stories from Jay's Blog",
  openGraph: {
    title: "Blog | Jay",
    url: "https://jayfolio.dev/blog",
    description: "Read latest stories from Jay's Blog",
    images:
      "https://res.cloudinary.com/dubinx/image/upload/v1773605074/jay-logo.png",
  },
};

export default async function Blog() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        eyebrow="Blog"
        title="Notes from the backend."
        description="Welcome to my blog domain where I share personal stories about things I've learned, projects I'm hacking on and just general findings. I also write for other publications."
      >
        <Social type="publication" />
      </PageHeading>

      <Posts />
    </main>
  );
}
