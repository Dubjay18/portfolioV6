import Parser from "rss-parser";

export interface ExternalContent {
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  link: string;
}

// Parse Medium URL to get RSS feed
function getMediumRSSUrl(mediumUrl: string): string {
  try {
    const url = new URL(mediumUrl);
    const pathname = url.pathname;

    // Extract username or publication from pathname
    // Medium URLs are typically: medium.com/@username/story-id or medium.com/publication/story-id
    const pathParts = pathname.split("/").filter((part) => part);

    if (pathParts[0].startsWith("@")) {
      // It's a user profile
      return `https://medium.com/feed/${pathParts[0]}`;
    } else if (pathParts.length > 0) {
      // It's a publication or specific article
      return `https://medium.com/feed/${pathParts[0]}`;
    }
  } catch (e) {
    console.error("Error parsing Medium URL:", e);
  }

  return mediumUrl;
}

// Fetch and parse external content from a URL
export async function fetchExternalContent(
  url: string,
  source: "medium" | "devto" | "other" = "medium"
): Promise<ExternalContent | null> {
  try {
    const parser = new Parser();

    // For Medium articles, we need to find the RSS feed
    if (source === "medium") {
      const feedUrl = getMediumRSSUrl(url);

      try {
        // Fetch the RSS feed
        const feed = await parser.parseURL(feedUrl);

        if (!feed.items || feed.items.length === 0) {
          console.error("No items found in Medium feed");
          return null;
        }

        // Try to find the article by title similarity or just use the first/most relevant one
        let article = feed.items[0];

        // Try to match by URL if possible
        const matchedArticle = feed.items.find((item) => {
          if (!item.link) return false;
          try {
            const itemUrl = new URL(item.link).pathname;
            const targetUrl = new URL(url).pathname;
            // Compare last part of URL (slug)
            return (
              itemUrl.includes(targetUrl.split("/").pop() || "") ||
              targetUrl.includes(itemUrl.split("/").pop() || "")
            );
          } catch {
            return false;
          }
        });

        if (matchedArticle) {
          article = matchedArticle;
        }

        // Extract content - Medium RSS usually has content in the content field
        const contentHtml = article.content || article.description || "";

        if (!contentHtml) {
          console.error("No content found in Medium article feed item");
          return null;
        }

        return {
          title: article.title || "",
          content: contentHtml,
          author: article.author || article.creator || "Unknown",
          publishedAt: article.pubDate || new Date().toISOString(),
          link: article.link || url,
        };
      } catch (feedError) {
        console.error("Error fetching Medium feed:", feedError);
        return null;
      }
    }

    // For Dev.to, use their RSS feed directly
    if (source === "devto") {
      try {
        const feed = await parser.parseURL(url);

        if (feed.items && feed.items.length > 0) {
          const article = feed.items[0];

          return {
            title: article.title || "",
            content: article.content || article.description || "",
            author: article.author || "Unknown",
            publishedAt: article.pubDate || new Date().toISOString(),
            link: article.link || url,
          };
        }
      } catch (feedError) {
        console.error("Error fetching Dev.to feed:", feedError);
        return null;
      }
    }

    // For other sources, return null and let the page handle it
    return null;
  } catch (error) {
    console.error("Error fetching external content:", error);
  }

  return null;
}
