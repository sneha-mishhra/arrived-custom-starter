import type { PublicEventData } from "@/lib/happily/types";

import { AgendaList } from "./agenda-list";
import { Container } from "./container";
import { ContentSection } from "./content-section";
import { FaqList } from "./faq-list";
import { hasText, text } from "./helpers";
import { HeroSection } from "./hero-section";
import { Markdown } from "./markdown";
import { RegistrationForm } from "./registration-form";
import { SectionHeading } from "./section-heading";
import { SpeakersGrid } from "./speakers-grid";
import { SponsorsGrid } from "./sponsors-grid";

type EventPageProps = {
  eventData: PublicEventData;
  eventId: string;
  env: "staging" | "prod";
};

export function EventPage({ eventData, eventId, env }: EventPageProps) {
  const { event, form, sessions, speakers, sponsors, faqs, tracks } = eventData;
  const content = event.content;

  return (
    <main>
      <HeroSection event={event} formActive={form?.is_active} />

      {hasText(content.aboutTitle) || hasText(content.aboutDescription) ? (
        <ContentSection
          id="about"
          title={text(content.aboutTitle, "About")}
          description={content.aboutDescription}
          image={content.aboutImage}
          wrapperClassName="pt-32"
        />
      ) : null}

      {sessions.length ? (
        <Container id="agenda">
          <SectionHeading
            title={text(content.agendaTitle, "Agenda")}
            description={content.agendaDescription}
          />
          <div className="mt-8">
            <AgendaList
              sessions={sessions}
              speakers={speakers}
              tracks={tracks}
              event={event}
            />
          </div>
        </Container>
      ) : null}

      {speakers.length ? (
        <Container id="speakers">
          <SectionHeading
            title={text(content.speakersTitle, "Speakers")}
            description={content.speakersDescription}
          />
          <div className="mt-8">
            <SpeakersGrid speakers={speakers} />
          </div>
        </Container>
      ) : null}

      {form ? (
        <Container
          id="register"
          className="max-w-7xl"
          wrapperClassName="bg-black text-white pt-4"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div id="location" className="flex flex-col">
              <h2 className="text-4xl font-semibold">Registration</h2>
              <p className="mt-3 text-base opacity-80 md:text-lg">
                To join the event, please register below.
              </p>
              <div className="mt-10 w-full">
                <RegistrationForm
                  eventId={eventId}
                  env={env}
                  form={form}
                  redirectTo="/confirmation"
                  buttonText={form.form_button_text}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-base opacity-80 md:text-lg">
                Please register to see the exact location of this event.
              </p>
              <div className="mt-6 overflow-hidden rounded-lg border border-white/[0.08]">
                <iframe
                  title="Kuala Lumpur, Malaysia"
                  src="https://maps.google.com/maps?q=Kuala+Lumpur%2C+Malaysia&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="520"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.9)_contrast(0.95)]"
                />
              </div>
            </div>
          </div>
        </Container>
      ) : null}

      {hasText(content.companyAboutTitle) ||
      hasText(content.companyAboutDescription) ? (
        <ContentSection
          id="host"
          title={text(content.companyAboutTitle, "About the Host")}
          description={content.companyAboutDescription}
          image={content.companyAboutImage}
        />
      ) : null}

      {sponsors.length ? (
        <Container id="sponsors">
          <SectionHeading
            title={text(content.sponsorsTitle, "Sponsors")}
            description={content.sponsorsDescription}
          />
          <div className="mt-8">
            <SponsorsGrid sponsors={sponsors} />
          </div>
        </Container>
      ) : null}

      {faqs.length ? (
        <Container id="faqs">
          <SectionHeading
            title={text(content.faqsTitle, "FAQs")}
            description={content.faqsDescription}
          />
          <div className="mt-8">
            <FaqList faqs={faqs} />
          </div>
        </Container>
      ) : null}
    </main>
  );
}
