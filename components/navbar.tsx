"use client";

import { useEffect, useState } from "react";

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

// Extract the "#foo" portion from an href like "/#about" or "#about".
function hashOf(href: string): string {
  const idx = href.indexOf("#");
  return idx === -1 ? "" : href.slice(idx);
}

export function Navbar({ nav, ctaText, ctaHref }: NavbarProps) {
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const sync = () => setActiveHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <nav className="hidden items-center gap-6 font-(family-name:--font-space-mono) text-xs uppercase tracking-[0.12em] text-white md:flex">
      {nav.map((link) => {
        const linkHash = hashOf(link.href);
        const isActive = linkHash === activeHash && activeHash !== "";
        return (
          <ScrollLink
            key={link.href}
            href={link.href}
            onClick={() => setActiveHash(linkHash)}
            className="group flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            {link.label}
            <span
              aria-hidden="true"
              className={`inline-block h-1.5 w-1.5 transition-colors ${
                isActive ? "bg-[#163EE8]" : "bg-white/40"
              }`}
            />
          </ScrollLink>
        );
      })}

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
