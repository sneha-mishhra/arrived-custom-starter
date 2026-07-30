"use client";

import { ScrollLink } from "./scroll-link";

export type NavLinkItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
};

export function Navbar({ nav, ctaText, ctaHref }: NavbarProps) {
  return (
    <nav className="hidden items-center gap-6 font-(family-name:--font-space-mono) text-xs uppercase tracking-[0.12em] text-white md:flex">
      {nav.map((link) => (
        <ScrollLink
          key={link.href}
          href={link.href}
          className="group flex items-center gap-2 transition-opacity hover:opacity-70"
        >
          {link.label}
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 bg-white/40"
          />
        </ScrollLink>
      ))}

      {ctaHref && ctaText ? (
        <ScrollLink
          href={ctaHref}
          className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-(--event-primary-bg) px-4 py-2 font-bold text-(--event-primary-text) transition-opacity hover:opacity-90"
        >
          {ctaText}
          <span aria-hidden="true">↗</span>
        </ScrollLink>
      ) : null}
    </nav>
  );
}
