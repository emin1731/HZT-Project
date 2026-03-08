import { promises as fs } from "node:fs";
import path from "node:path";
import { FeedbackItem } from "@/lib/types";

const FEEDBACKS_FILE_PATH = path.join(
  process.cwd(),
  "content",
  "feedbacks.json",
);

function isFeedbackArray(value: unknown): value is FeedbackItem[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      typeof item.text === "string" &&
      typeof item.date === "string",
  );
}

async function ensureFeedbackFile() {
  try {
    await fs.access(FEEDBACKS_FILE_PATH);
  } catch {
    await fs.mkdir(path.dirname(FEEDBACKS_FILE_PATH), { recursive: true });
    await fs.writeFile(FEEDBACKS_FILE_PATH, "[]", "utf8");
  }
}

export async function getFeedbacks(): Promise<FeedbackItem[]> {
  await ensureFeedbackFile();

  const fileContent = await fs.readFile(FEEDBACKS_FILE_PATH, "utf8");

  try {
    const parsed = JSON.parse(fileContent);

    if (isFeedbackArray(parsed)) {
      return parsed;
    }

    return [];
  } catch {
    return [];
  }
}

export async function saveFeedbacks(feedbacks: FeedbackItem[]) {
  await ensureFeedbackFile();
  await fs.writeFile(
    FEEDBACKS_FILE_PATH,
    JSON.stringify(feedbacks, null, 2),
    "utf8",
  );
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

  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date());

  const newFeedback: FeedbackItem = {
    id: crypto.randomUUID(),
    name: normalizedName,
    text: normalizedText,
    date,
  };

  const feedbacks = await getFeedbacks();
  const updatedFeedbacks = [newFeedback, ...feedbacks];
  await saveFeedbacks(updatedFeedbacks);

  return newFeedback;
}
