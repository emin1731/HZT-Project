import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    metadata: post.metadata,
  }));

  return new Response(JSON.stringify({ posts }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
