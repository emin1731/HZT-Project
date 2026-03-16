"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const isHomePage = pathname === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHomePage
          ? isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent text-primary-foreground border-b border-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className={"hover:text-primary transition-colors"}>
            <Image
              src="/future-careers-logo.png"
              alt="Logo"
              width={140}
              height={20}
            />
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden md:flex gap-8 items-center">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors text-primary",
                      pathname === link.href
                        ? "text-primary font-semibold"
                        : "text-foreground",
                      isHomePage && !isScrolled && "text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
              {/* <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button> */}
              <Button variant="default" size="sm" asChild>
                <Link
                  target="_blank"
                  href="https://wa.me/994559514280"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link
                  target="blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
                >
                  Reserve Career Meeting
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "transition-colors hover:text-primary",
                isHomePage && !isScrolled
                  ? "text-primary-foreground"
                  : "text-foreground",
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[73px] bg-background z-40 transition-transform duration-300 bg-white",
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
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link
                target="_blank"
                href="https://wa.me/994559514280"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </Button>
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link
                target="blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdnQH8aIQbrU3t2HaVln-cPq-F4cd1r3MgLYoJ2-dANDOfGMw/viewform"
                onClick={() => setIsMenuOpen(false)}
              >
                Reserve Career Meeting
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
