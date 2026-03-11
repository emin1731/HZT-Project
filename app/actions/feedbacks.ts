"use server";

import { addFeedback, getFeedbacks } from "@/lib/feedbacks";
import { FeedbackItem } from "@/lib/types";

export async function loadFeedbacksAction(): Promise<FeedbackItem[]> {
  return getFeedbacks();
}

export async function addFeedbackAction(
  name: string,
  text: string,
): Promise<{ feedback?: FeedbackItem; error?: string }> {
  if (!process.env.DATABASE_URL) {
    return { error: "Database is not configured yet." };
  }

  const feedback = await addFeedback(name, text);

  if (!feedback) {
    return { error: "Name and feedback text are required." };
  }

  return { feedback };
}
