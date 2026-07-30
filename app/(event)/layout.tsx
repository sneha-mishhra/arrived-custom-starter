import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { DM_Sans, Lora, Space_Mono } from "next/font/google";
import "../globals.css";

import { EventShell } from "@/components/event-shell";
import { styleValue } from "@/components/helpers";
import { getPublicEvent } from "@/lib/happily/queries";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { event } = await getPublicEvent();
  const { metadata } = event;

  return {
    title: metadata.title || event.name,
    description: metadata.description || "",
    ...(metadata.allow_search_engine_indexing === false && {
      robots: "noindex, nofollow",
    }),
    openGraph: {
      ...(metadata.image_url && { images: [metadata.image_url] }),
    },
  };
}

export default async function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const eventData = await getPublicEvent();
  const styles = eventData.event.styles;

  // Page = all black + all white text. Flagright Blue reserved for CTA buttons:
  // - --event-primary-bg drives nav CTA, mobile menu CTA, submit button, calendar
  //   button (see navbar / mobile-menu / registration-form / add-to-calendar).
  // - --event-accent-bg drives the hero "Register" button.
  // Section-level bgs (secondary, base) stay black so nothing but buttons is blue.
  const eventVars = {
    "--event-primary-bg": "#1668F7",
    "--event-primary-text": "#FFFFFF",
    "--event-secondary-bg": "#000000",
    "--event-secondary-text": "#FFFFFF",
    "--event-accent-bg": "#1668F7",
    "--event-accent-text": "#FFFFFF",
    "--event-base-bg": "#000000",
    "--event-base-text": "#FFFFFF",
    "--event-border-radius": styleValue(styles, "borderRadius", "8px"),
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${lora.variable} ${spaceMono.variable} ${dmSans.className} h-full antialiased`}
    >
      <body style={eventVars} className="min-h-full flex flex-col">
        <EventShell eventData={eventData}>{children}</EventShell>
      </body>
    </html>
  );
}
