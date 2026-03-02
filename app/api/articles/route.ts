import { getAllArticles } from "@/lib/posts";

export async function GET() {
  const articles = getAllArticles().map((article) => ({
    slug: article.slug,
    metadata: article.metadata,
  }));

  return new Response(JSON.stringify({ articles }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
