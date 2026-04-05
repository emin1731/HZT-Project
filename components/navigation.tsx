"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AppLink } from "./ui/link";
import { Button } from "./ui/button";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const isHomeAtTop = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#team", label: "Team" },
    { href: "/#mentors", label: "Mentors" },
    { href: "/news", label: "News" },
    { href: "/articles", label: "Articles" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ",
        isHomePage
          ? isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent text-white border-b border-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className={"transition-colors"}>
            <Image
              src="/future-careers-logo.png"
              alt="Logo"
              width={140}
              height={20}
              className={cn(
                "transition-all duration-300",
                isHomeAtTop &&
                  "brightness-0 invert drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]",
              )}
            />
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden md:flex gap-8 items-center">
              {links.map((link) => (
                <li key={link.href}>
                  <AppLink
                    variant={"hoverUnderline"}
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors",
                      isHomeAtTop
                        ? pathname === link.href
                          ? "text-white font-semibold"
                          : "text-white/90 hover:text-white"
                        : pathname === link.href
                          ? "text-primary font-semibold"
                          : "text-foreground hover:text-primary",
                    )}
                  >
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
              <AppLink
                variant="navCta"
                target="_blank"
                href="https://wa.me/994559514280"
                rel="noopener noreferrer"
                className="rounded-full"
              >
                Contact Us
              </AppLink>
              <AppLink
                variant="navCta"
                target="_blank"
                // href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
                href="https://wa.me/994559514280"
                rel="noopener noreferrer"
                className="rounded-full"
              >
                Reserve Career Meeting
              </AppLink>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "mx-5 transition-colors",
                isHomeAtTop
                  ? "text-white hover:text-white/80"
                  : "hover:text-primary",
              )}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-18.25 z-40 transition-transform duration-300 bg-white",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col p-6 space-y-4 bg-white">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-lg py-2 transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border space-y-3">
            <AppLink
              variant="navCta"
              target="_blank"
              href="https://wa.me/994559514280"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </AppLink>
            <AppLink
              variant="navCta"
              target="_blank"
              // href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
              href="https://wa.me/994559514280"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Reserve Career Meeting
            </AppLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
