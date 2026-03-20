"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { PostItem } from "@/lib/posts";
import { Button } from "./ui/button";

interface NewsPopupModalProps {
  latestNews?: PostItem | null;
}

export function NewsPopupModal({ latestNews }: NewsPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-lg shadow-lg border border-border overflow-hidden">
        {/* Close button */}
        <Button
          variant={"ghost"}
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-md transition-colors z-10 h-auto"
          aria-label="Close popup"
        >
          <X className="size-8 text-gray-500" />
        </Button>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">
              Latest News
            </p>
            <h3 className="text-sm font-bold text-foreground line-clamp-2">
              {latestNews?.metadata?.title || "Check Our Latest News"}
            </h3>
            <p className="text-xs text-foreground/70 line-clamp-2">
              {latestNews?.metadata?.description ||
                "Stay updated with our latest updates and announcements"}
            </p>
          </div>

          <Link
            href={latestNews?.slug ? `/news/${latestNews.slug}` : "/news"}
            onClick={() => setIsOpen(false)}
            className="inline-block w-full"
          >
            <Button className="w-full bg-primary text-primary-foreground text-xs font-semibold py-2 px-4 hover:bg-primary/90 transition-colors rounded-full h-8">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
