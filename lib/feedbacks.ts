import { FeedbackItem } from "@/lib/types";
import { prisma } from "@/lib/prisma";

type FeedbackRecord = {
  id: string;
  name: string;
  text: string;
  createdAt: Date;
};

function formatFeedbackDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function getFeedbacks(): Promise<FeedbackItem[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  const feedbackModel = (prisma as any).feedback;

  if (!feedbackModel) {
    return [];
  }

  let feedbacks: FeedbackRecord[];

  try {
    feedbacks = await feedbackModel.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }

  return feedbacks.map((feedback) => ({
    id: feedback.id,
    name: feedback.name,
    text: feedback.text,
    date: formatFeedbackDate(feedback.createdAt),
  }));
}

export async function addFeedback(
  name: string,
  text: string,
): Promise<FeedbackItem | null> {
  const normalizedName = name.trim();
  const normalizedText = text.trim();

  if (!normalizedName || !normalizedText) {
    return null;
  }

  if (!process.env.DATABASE_URL) {
    return null;
  }

  const feedbackModel = (prisma as any).feedback;

  if (!feedbackModel) {
    return null;
  }

  let feedback: FeedbackRecord;

  try {
    feedback = await feedbackModel.create({
      data: {
        name: normalizedName,
        text: normalizedText,
      },
    });
  } catch {
    return null;
  }

  return {
    id: feedback.id,
    name: feedback.name,
    text: feedback.text,
    date: formatFeedbackDate(feedback.createdAt),
  };
}
