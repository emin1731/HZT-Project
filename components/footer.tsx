import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-bold text-lg text-foreground hover:text-primary transition-colors"
            >
              Future Careers
            </Link>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Empowering students through mentorship, education, and
              opportunity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/timeline"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/news"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  News & Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="text-sm text-foreground/70">
                Dedicated to social inclusion and opportunity
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/60">
              © {currentYear} Future Careers. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
