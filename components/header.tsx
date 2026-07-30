"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileMenu } from "./mobile-menu";
import type { NavLinkItem } from "./navbar";
import { Navbar } from "./navbar";

type HeaderProps = {
  logo?: string | null;
  logoAlt?: string;
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
  hideNavigation?: boolean;
};

export function Header({
  logo,
  logoAlt = "Logo",
  nav,
  ctaText,
  ctaHref,
  hideNavigation = false,
}: HeaderProps) {
  if (hideNavigation) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <div className="relative z-60 flex items-center">
          {logo && (
            <Link href="/">
              <Image
                src={logo}
                alt={logoAlt}
                width={180}
                height={40}
                className="relative z-60 h-8 w-auto object-contain object-left"
                draggable={false}
              />
            </Link>
          )}
        </div>

        <Navbar nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        <div className="md:hidden">
          <MobileMenu nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </div>
    </header>
  );
}
