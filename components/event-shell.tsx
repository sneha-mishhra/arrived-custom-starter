import type { ReactNode } from "react";

import type { PublicEventData } from "@/lib/happily/types";

import { Footer } from "./footer";
import Grainient from "./grainient";
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
        className="pointer-events-none absolute inset-0 z-0 px-4 sm:px-8"
      >
        <div className="mx-auto h-full max-w-7xl border-x border-white/[0.08]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_65%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_65%,transparent_100%)]"
      >
        {/* Palette hex codes per spec; colorBalance/contrast/color2 tuned so
             the shader is actually visible at nav+hero scale. At the specced
             values (0.0/1.5/#252139) the whole surface crushes to black once
             the container is taller than a nav bar. */}
        <Grainient
          color1="#7743c0"
          color2="#000000"
          color3="#0a0512"
          timeSpeed={0.8}
          colorBalance={0.5}
          warpStrength={1.0}
          warpFrequency={7.8}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          blendAngle={14}
          blendSoftness={0.72}
          rotationAmount={500.0}
          noiseScale={1.6}
          grainAmount={0.05}
          grainScale={0.8}
          grainAnimated={false}
          contrast={0.9}
          gamma={1.0}
          saturation={1.15}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
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
