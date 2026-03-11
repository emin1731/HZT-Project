"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FeedbackItem } from "@/lib/types";
import { Card } from "./ui/card";

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

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const response = await fetch("/api/feedbacks", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { feedbacks?: unknown };

        if (isFeedbackArray(payload.feedbacks)) {
          setFeedbacks(payload.feedbacks);
        }
      } catch {
        // Keep initial feedbacks when request fails
      }
    };

    loadFeedbacks();
  }, []);

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
      const response = await fetch("/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: normalizedName,
          text: normalizedText,
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setSubmitError(
          errorPayload?.error ??
            "Could not submit feedback right now. Please try again.",
        );
        return;
      }

      const payload = (await response.json()) as { feedback?: unknown };

      if (
        payload.feedback &&
        typeof payload.feedback === "object" &&
        isFeedbackArray([payload.feedback])
      ) {
        setFeedbacks((previousFeedbacks) => [
          payload.feedback as FeedbackItem,
          ...previousFeedbacks,
        ]);
      }

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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Check Out What People Saying
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl text-pretty leading-relaxed text-center">
            Real voices from students and families who joined Future Careers
            sessions.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full px-10"
        >
          <CarouselContent>
            {feedbacks.map((feedback) => (
              <CarouselItem
                key={feedback.id}
                className="md:basis-1/2 lg:basis-1/3 mt-2"
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 via-card to-secondary/10 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">
                  <div className="pointer-events-none absolute top-0 right-1 text-8xl leading-none text-primary/10 select-none">
                    ”
                  </div>
                  <div className="relative flex h-full flex-col justify-between">
                    <p className="text-foreground/85 leading-relaxed text-pretty">
                      “{feedback.text}”
                    </p>

                    <div className="mt-6 border-t border-primary/20 pt-4">
                      <p className="font-semibold text-foreground">
                        {feedback.name}
                      </p>
                      <p className="mt-1 text-sm text-foreground/70">
                        {feedback.date}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>

        <div className="mt-8 px-10">
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
      </div>
    </ScrollSection>
  );
}
