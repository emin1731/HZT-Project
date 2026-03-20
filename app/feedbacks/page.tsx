import { ScrollSection } from "@/components/scroll-section";
import { getFeedbacks } from "@/lib/feedbacks";
import { UserRound } from "lucide-react";

export default async function FeedbacksPage() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollSection className="mb-10">
          <h1 className="text-5xl font-bold text-primary mb-4">
            All Feedbacks
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl leading-relaxed">
            Full feedback from students and families who joined Future Careers
            sessions.
          </p>
        </ScrollSection>

        <hr className="border-t border-border mb-8" />

        <ScrollSection>
          {feedbacks.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-foreground/70">
              No feedback has been shared yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {feedbacks.map((feedback) => (
                <article
                  key={feedback.id}
                  className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between"
                >
                  <p className="text-center text-foreground/90 leading-relaxed text-pretty">
                    “{feedback.text}”
                  </p>

                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserRound className="size-4" />
                      </span>
                      <p className="font-semibold text-foreground">
                        {feedback.name}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-foreground/70">
                      {feedback.date}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </ScrollSection>
      </div>
    </div>
  );
}
