"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface NewsPostResponse {
  slug: string;
  metadata: {
    title?: string;
    date?: string;
    description?: string;
    type?: "announcement" | "event" | "milestone";
    author?: string;
    tags?: string[];
    [key: string]: unknown;
  };
  html: string;
}

interface NewsListResponse {
  posts: Array<{
    slug: string;
    metadata: NewsPostResponse["metadata"];
  }>;
}

export default function PostPage() {
  const pathname = usePathname();
  const slug = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }, [pathname]);

  const [post, setPost] = useState<NewsPostResponse | null>(null);
  const [suggestedPosts, setSuggestedPosts] = useState<
    NewsListResponse["posts"]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      setLoading(true);
      setError(null);
      setSuggestedPosts([]);

      try {
        const [postResponse, postsResponse] = await Promise.all([
          fetch(`/api/news/${slug}`),
          fetch("/api/news"),
        ]);

        if (!postResponse.ok) {
          throw new Error("Not found");
        }

        const data = (await postResponse.json()) as NewsPostResponse;

        let related: NewsListResponse["posts"] = [];
        if (postsResponse.ok) {
          const postsData = (await postsResponse.json()) as NewsListResponse;
          related = postsData.posts
            .filter((item) => item.slug !== data.slug)
            .slice(0, 3);
        }

        if (isMounted) {
          setPost(data);
          setSuggestedPosts(related);
        }
      } catch (err) {
        if (isMounted) {
          setPost(null);
          setSuggestedPosts([]);
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      void loadPost();
    } else {
      setLoading(false);
      setPost(null);
      setError("Not found");
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 ">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-20 mb-8"></div>
          <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">News Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The news item you're looking for doesn't exist.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const typeConfig = {
    announcement: { variant: "default" as const, label: "Announcement" },
    event: { variant: "secondary" as const, label: "Event" },
    milestone: { variant: "outline" as const, label: "Milestone" },
  };

  const typeInfo = post.metadata.type ? typeConfig[post.metadata.type] : null;

  const getAuthorInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <div className="container pt-32 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Navigation */}
      <Link
        href="/news"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to News
      </Link>

      <article>
        {/* Header */}
        <header className="mb-8 pb-8 border-b">
          {/* Type Badge */}
          {typeInfo && (
            <div className="mb-4">
              <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.metadata.title}
          </h1>

          {/* Author & Metadata */}
          {post.metadata.author && (
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                {getAuthorInitials(post.metadata.author)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {post.metadata.author}
                  </span>
                  {post.metadata.date && (
                    <>
                      <span>•</span>
                      <time dateTime={post.metadata.date}>
                        {new Date(post.metadata.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </time>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {post.metadata.description && (
            <p className="text-lg text-muted-foreground">
              {post.metadata.description}
            </p>
          )}
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none markdown-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Footer */}
        {suggestedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Other News</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {suggestedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="rounded-lg border bg-card p-4 transition-colors hover:border-primary"
                >
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {item.metadata.title ?? "Untitled"}
                  </h3>
                  {item.metadata.date && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.metadata.date}
                    </p>
                  )}
                  {item.metadata.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.metadata.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href="/news"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              More News
            </Link>

            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Topics:</span>
                {post.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
}
