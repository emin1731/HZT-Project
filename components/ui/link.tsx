import type * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "relative inline-flex items-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        hoverUnderline:
          "after:pointer-events-none after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100",
        navCta:
          "h-9 justify-center whitespace-nowrap rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/85 hover:shadow-soft",
        heroCta:
          "inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-10 text-lg font-medium text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-elevated active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type AppLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  Omit<NextLinkProps, "href"> &
  VariantProps<typeof linkVariants> & {
    href: NextLinkProps["href"];
  };

function AppLink({ className, variant, href, ...props }: AppLinkProps) {
  return (
    <NextLink
      href={href}
      className={cn(linkVariants({ variant }), className)}
      {...props}
    />
  );
}

export { AppLink, linkVariants };
