import { Mentor } from "@/lib/types";
import { Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 ease-out hover:scale-105 transform space-y-0 h-full flex flex-col">
      {/* Photo */}
      {mentor.photo && (
        <div className="w-full bg-muted">
          <Image
            src={mentor.photo}
            alt={`${mentor.name} ${mentor.surname}`}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-4 flex flex-col flex-grow">
        <div>
          <h3 className="font-semibold text-foreground text-lg">
            {mentor.name} {mentor.surname}
          </h3>
          {mentor.expertise && (
            <p className="text-sm text-primary font-medium mt-1">
              {mentor.expertise}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-2 animate-fade-up">
          {(mentor.linkedIn || mentor.instagram) && (
            <div className="flex gap-3">
              {mentor.linkedIn && (
                <Link
                  href={mentor.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {mentor.instagram && (
                <Link
                  href={mentor.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
            </div>
          )}
          <Button size="sm" className="w-full" asChild>
            <Link target="_blank" href="https://wa.me/994559514280">
              Reserve Session
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
