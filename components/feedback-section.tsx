"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppLink } from "@/components/ui/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollSection } from "@/components/scroll-section";
import {
  addFeedbackAction,
  loadFeedbacksAction,
} from "@/app/actions/feedbacks";
import { FeedbackItem } from "@/lib/types";
import { Card } from "./ui/card";
import { ArrowRight, UserRound } from "lucide-react";

interface FeedbackSectionProps {
  initialFeedbacks: FeedbackItem[];
}

export function FeedbackSection({ initialFeedbacks }: FeedbackSectionProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(initialFeedbacks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const previewFeedbacks = feedbacks.slice(0, 3);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedText = text.trim();

    if (!normalizedName || !normalizedText || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await addFeedbackAction(normalizedName, normalizedText);

      if (result.error || !result.feedback) {
        setSubmitError(
          result.error ??
            "Could not submit feedback right now. Please try again.",
        );
        return;
      }

      const latestFeedbacks = await loadFeedbacksAction();
      setFeedbacks(latestFeedbacks);

      setName("");
      setText("");
      setIsDialogOpen(false);
    } catch {
      setSubmitError("Network error. Please check your connection and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollSection className="pt-10" id="feedback">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-4xl font-bold text-primary">
            Latest updates from our events
          </h2>

          <AppLink
            variant="heroCta"
            href="/feedbacks"
            className="self-start rounded-full px-5 text-base h-10"
          >
            See more
            <ArrowRight className="ml-2 h-5 w-5" />
          </AppLink>
        </div>
        <p className="text-xl text-foreground/80 text-pretty leading-relaxed text-start">
          Real voices from students and families who joined Future Careers
          sessions.
        </p>

        <hr className="border-t border-border" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="group h-full rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-full flex-col justify-between">
                <p className="line-clamp-5 text-center text-foreground/85 leading-relaxed text-pretty">
                  “{feedback.text}”
                </p>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserRound className="size-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">
                        {feedback.name}
                      </p>
                      <p className="text-sm text-foreground/70 text-start">
                        {feedback.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (open) {
                setSubmitError(null);
              }
            }}
          >
            <Card className="rounded-2xl border-dashed border-primary/40 bg-primary/5 p-6">
              <h1 className="text-2xl font-semibold text-center">
                Want to share your feedback?
              </h1>
              <p className="text-center">
                You can share your experience with Future Careers. Just press
                the button below and express your thoughts.
              </p>

              <div className="flex justify-center">
                <DialogTrigger asChild>
                  <Button type="button" variant="default" className="w-auto">
                    Add your feedback
                  </Button>
                </DialogTrigger>
              </div>
            </Card>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit feedback</DialogTitle>
                <DialogDescription>
                  Fill in your name and feedback. It will appear in this
                  section.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback-name">Name</Label>
                  <Input
                    id="feedback-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-text">Feedback</Label>
                  <Textarea
                    id="feedback-text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Write your feedback"
                    rows={5}
                    required
                  />
                </div>

                {submitError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </ScrollSection>
  );
}
