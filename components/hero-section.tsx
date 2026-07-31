import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";

import { Button } from "@/components/ui/button";

import { ScrollLink } from "./scroll-link";
import { EventDetails } from "./event-details";
import { heroImage, text } from "./helpers";
import { Container } from "./container";

type HeroSectionProps = {
  event: PublicEventData["event"];
  formActive?: boolean;
};

export function HeroSection({ event, formActive }: HeroSectionProps) {
  const content = event.content;
  const heroSectionType = content.heroSection ?? "image";
  const image = heroImage(content);
  const overlayOpacity =
    content.overlay === "0%" ? "bg-black/0" : "bg-black/50";
  const hasVideo = heroSectionType === "video" && !!content.heroVideo;
  const hasImage = heroSectionType === "image" && !!image;
  // Only render the darkening overlay when we actually have media behind it;
  // otherwise the overlay was covering the page-level grainient behind the hero.
  const hasBackground = hasVideo || hasImage;

  return (
    <section className="relative isolate overflow-hidden text-white">
      {hasBackground && (
        <>
          {heroSectionType === "video" && content.heroVideo && (
            <video
              key={content.heroVideo}
              className="absolute inset-0 -z-20 size-full object-cover"
              loop
              muted
              autoPlay
              playsInline
            >
              <source src={content.heroVideo} type="video/mp4" />
            </video>
          )}
          {heroSectionType === "image" && image && (
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 -z-20 object-cover"
            />
          )}
          <div className={`absolute inset-0 -z-10 ${overlayOpacity}`} />
        </>
      )}
      <Container
        id="hero"
        className="grid content-end max-w-7xl pt-20 pb-0 min-h-[50vh]"
      >
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">
            {text(content.companyName, event.type ?? "Event")}
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            {text(event.name, event.name)}
          </h1>
          <EventDetails event={event} />
          <p>{text(content.heroText)}</p>
          {formActive &&
          event.display_settings.buttonLinks?.heroCTA.display &&
          event.display_settings.buttonLinks.heroCTA.text ? (
            <Button
              asChild
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-(--event-primary-bg) px-4 py-2 font-(family-name:--font-space-mono) text-xs font-bold uppercase tracking-[0.12em] text-(--event-primary-text) transition-opacity hover:bg-(--event-primary-bg) hover:opacity-90"
            >
              <ScrollLink href="#register">
                {text(
                  event.display_settings.buttonLinks.heroCTA.text,
                  "Request to Join",
                )}
                <span aria-hidden="true">↗</span>
              </ScrollLink>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
