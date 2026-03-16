"use client";

import Image from "next/image";
import { Mentor } from "@/lib/types";

interface MentorMarqueeCardProps {
  mentor: Mentor;
  imagePosition: "left" | "right";
}

function MentorMarqueeCard({ mentor, imagePosition }: MentorMarqueeCardProps) {
  return (
    <div className="group relative flex w-[28rem] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm mx-4 cursor-default transition-all duration-300 hover:scale-[1.04] hover:shadow-xl">
      {imagePosition === "left" && mentor.photo && (
        <div className="w-48 shrink-0 self-stretch overflow-hidden">
          <Image
            src={mentor.photo}
            alt={`${mentor.name} ${mentor.surname}`}
            width={192}
            height={280}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}

      <div className="min-w-0 flex-1 p-6">
        <p className="font-semibold text-foreground text-xl leading-snug">
          {mentor.name} {mentor.surname}
        </p>
        <p className="text-sm text-foreground/60 mt-2 line-clamp-3 leading-snug">
          {mentor.expertise}
        </p>
      </div>

      {imagePosition === "right" && mentor.photo && (
        <div className="w-48 shrink-0 self-stretch overflow-hidden">
          <Image
            src={mentor.photo}
            alt={`${mentor.name} ${mentor.surname}`}
            width={192}
            height={280}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
    </div>
  );
}

interface MentorMarqueeGridProps {
  mentors: Mentor[];
}

export function MentorMarqueeGrid({ mentors }: MentorMarqueeGridProps) {
  const half = Math.ceil(mentors.length / 2);
  const row1 = mentors.slice(0, half);
  const row2 = mentors.slice(half);

  return (
    <div className="overflow-hidden space-y-5 py-4">
      {/* Row 1: scrolls left */}
      <div className="mentor-marquee-row">
        <div className="mentor-marquee-track mentor-marquee-left">
          {[...row1, ...row1].map((mentor, i) => (
            <MentorMarqueeCard
              key={`row1-${mentor.id}-${i}`}
              mentor={mentor}
              imagePosition={parseInt(mentor.id) % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>

      {/* Row 2: scrolls right */}
      <div className="mentor-marquee-row">
        <div className="mentor-marquee-track mentor-marquee-right">
          {[...row2, ...row2].map((mentor, i) => (
            <MentorMarqueeCard
              key={`row2-${mentor.id}-${i}`}
              mentor={mentor}
              imagePosition={parseInt(mentor.id) % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
