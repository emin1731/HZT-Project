import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { ScrollSection } from "@/components/scroll-section";
import { Eye } from "lucide-react";
import { AppLink } from "@/components/ui/link";

const typeConfig = {
  announcement: { label: "Announcement", variant: "default" as const },
  event: { label: "Event", variant: "secondary" as const },
  milestone: { label: "Milestone", variant: "outline" as const },
};

function extractFirstImageFromMarkdown(content: string): string | null {
  const match = content.match(/!\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/);
  return match?.[1] ?? null;
}

function getStaticViewsCount(seed: string): number {
  const hash = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return 200 + (hash % 301);
}

export default function NewsPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <ScrollSection className="mt-16 mb-5">
        <h1 className="text-5xl font-bold text-primary mb-6">News & Updates</h1>
        <p className="text-xl text-foreground/80 text-pretty leading-relaxed">
          Stay informed about our latest announcements, events, and milestones
          as we continue to grow and serve more students.
        </p>
      </ScrollSection>

      <hr className="border-t border-border mb-8" />

      {/* News List */}
      <ScrollSection className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => {
          const typeKey = post.metadata.type ?? "announcement";
          const typeMeta = typeConfig[typeKey] ?? typeConfig.announcement;
          const previewImage = extractFirstImageFromMarkdown(post.content);
          const viewsCount = getStaticViewsCount(post.slug);

          return (
            <article
              key={post.slug}
              className="bg-white border border-border rounded-xl p-8 hover:border-primary transition-colors space-y-4 group cursor-pointer h-full flex flex-col justify-between"
            >
              {previewImage && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border mb-2">
                  <Image
                    src={previewImage}
                    alt={post.metadata.title ?? "News image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant={typeMeta.variant}>{typeMeta.label}</Badge>
                    {post.metadata.date ? (
                      <p className="text-sm text-foreground/60">
                        {post.metadata.date}
                      </p>
                    ) : null}
                    <p className="text-sm text-foreground/60 inline-flex items-center gap-1">
                      <Eye className="size-4" />
                      {viewsCount} views
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.metadata.title ?? "Untitled"}
                  </h2>
                  {post.metadata.description ? (
                    <p className="text-foreground/80 leading-relaxed">
                      {post.metadata.description}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <AppLink
                  variant="heroCta"
                  href={`/news/${post.slug}`}
                  className="text-primary-foreground font-semibold hover:gap-2 transition-all flex items-center gap-1 w-fit h-8 text-sm"
                >
                  Read More
                  <span>→</span>
                </AppLink>
              </div>
            </article>
          );
        })}
      </ScrollSection>

      {/* Social Media */}
      <ScrollSection className="mt-16 from-primary/10 to-secondary/10 rounded-lg p-8 border border-primary/20 text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Follow Us</h2>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Stay connected with us on social media for the latest updates and
          stories.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="https://instagram.com/futurecareersproject"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors group"
          >
            <svg
              className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Instagram
            </span>
          </a>
          <Link
            href="https://chat.whatsapp.com/DjF8xA4ieaS5k7wfrnp5eb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors group"
          >
            <span
              aria-hidden="true"
              className="size-6 bg-current text-foreground group-hover:text-primary transition-colors [mask-image:url('/icons/whatsapp-icon.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
            />
            <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
              Join the group
            </span>
          </Link>
          <a
            // href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
            href="https://wa.me/994559514280"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors group"
          >
            <svg
              className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.727 6.727H14V5.818c0-.61.495-1.105 1.105-1.105h.621c.61 0 1.105.495 1.105 1.105v.91h-.727a1.378 1.378 0 00-1.377 1.376v8.727c0 .76.617 1.377 1.377 1.377h.727v.91c0 .61-.495 1.104-1.105 1.104h-.621c-.61 0-1.105-.495-1.105-1.105v-.91h.727a1.378 1.378 0 001.377-1.376V8.103a1.378 1.378 0 00-1.377-1.376zM7.895 3.273h8.21C17.77 3.273 19 4.503 19 6.168v11.664c0 1.665-1.23 2.895-2.895 2.895h-8.21c-1.665 0-2.895-1.23-2.895-2.895V6.168c0-1.665 1.23-2.895 2.895-2.895zm-.621 2.216a.828.828 0 00-.828.828v11.366c0 .457.371.828.828.828h8.452a.828.828 0 00.828-.828V6.317a.828.828 0 00-.828-.828H7.274zM9 8.455h6v1.09H9v-1.09zm0 2.454h6v1.091H9v-1.09zm0 2.455h4.364v1.09H9v-1.09z" />
            </svg>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Join Us
            </span>
          </a>
        </div>
      </ScrollSection>
    </div>
  );
}
