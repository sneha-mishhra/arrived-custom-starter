import type { ReactNode } from "react";

import type { PublicEventData } from "@/lib/happily/types";

import Image from "next/image";

import { Footer } from "./footer";
import { Header } from "./header";
import { styleValue, text } from "./helpers";
import type { NavLinkItem } from "./navbar";

type EventShellProps = {
  eventData: PublicEventData;
  children: ReactNode;
};

export function EventShell({ eventData, children }: EventShellProps) {
  const { event } = eventData;
  const styles = event.styles;

  const nav: NavLinkItem[] = [
    { label: "About", href: "/#about" },
    { label: "Agenda", href: "/#agenda" },
    { label: "Speakers", href: "/#speakers" },
    { label: "Host", href: "/#host" },
    { label: "Sponsors", href: "/#sponsors" },
    { label: "FAQ", href: "/#faq" },
    ...(event.photos_toggle ? [{ label: "Gallery", href: "/photos" }] : []),
  ];

  const buttonLinks = event.display_settings.buttonLinks;
  const showCta =
    eventData.form?.is_active &&
    buttonLinks?.navCTA.display &&
    buttonLinks.heroCTA.text;

  return (
    <div className="relative isolate flex min-h-screen flex-col bg-black text-(--event-base-text)">
      {/* Frame: two vertical lines at the left+right edges of the max-w-7xl
          content column, running full page height. Section dividers are added
          via border-b on Container (see container.tsx). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 px-9"
      >
        <div className="mx-auto h-full max-w-7xl border-x border-white/[0.08]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
      >
        <Image
          src="/kl-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle darken so white text stays legible over the bright sky */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <Header
        logo={event.logo_url}
        logoAlt={`${event.name} logo`}
        nav={nav}
        hideNavigation={event.display_settings.hideNavigation ?? false}
        ctaText={
          showCta ? text(buttonLinks!.heroCTA.text, "Register") : undefined
        }
        ctaHref={showCta ? "/#register" : undefined}
      />
      {children}
      <Footer baseTextColor={styleValue(styles, "baseText", "#171717")} />
    </div>
  );
}
