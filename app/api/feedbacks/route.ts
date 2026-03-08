import { addFeedback, getFeedbacks } from "@/lib/feedbacks";

export const runtime = "nodejs";

export async function GET() {
  const feedbacks = await getFeedbacks();

  return new Response(JSON.stringify({ feedbacks }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  let payload: { name?: string; text?: string };

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const feedback = await addFeedback(payload.name ?? "", payload.text ?? "");

  if (!feedback) {
    return new Response(
      JSON.stringify({ error: "Name and text are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ feedback }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
