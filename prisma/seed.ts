import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "../lib/prisma";

interface SeedFeedback {
  id: string;
  name: string;
  text: string;
  date: string;
}

function parseLegacyDate(value: string): Date {
  const parsed = new Date(`${value} UTC`);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  return new Date();
}

async function main() {
  const legacyPath = path.join(process.cwd(), "content", "feedbacks.json");
  const legacyRaw = await readFile(legacyPath, "utf8");
  const legacyFeedbacks = JSON.parse(legacyRaw) as SeedFeedback[];

  if (!Array.isArray(legacyFeedbacks) || legacyFeedbacks.length === 0) {
    return;
  }

  const feedbackModel = (prisma as any).feedback;

  if (!feedbackModel) {
    throw new Error("Prisma Feedback model delegate is not available.");
  }

  await feedbackModel.createMany({
    data: legacyFeedbacks.map((feedback) => ({
      id: feedback.id,
      name: feedback.name,
      text: feedback.text,
      createdAt: parseLegacyDate(feedback.date),
    })),
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error("Prisma seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
