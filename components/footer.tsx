import Image from "next/image";
import { SocialIcon } from "react-social-icons";

type FooterProps = {
  baseTextColor: string;
};

const SOCIALS = [
  { url: "https://www.linkedin.com/company/flagright/", label: "LinkedIn" },
  { url: "https://www.youtube.com/@FlagrightHQ", label: "YouTube" },
  { url: "https://twitter.com/FlagrightHQ", label: "X" },
  { url: "https://medium.com/@Flagright", label: "Medium" },
];

export function Footer({ baseTextColor: _baseTextColor }: FooterProps) {
  return (
    <footer className="relative z-10 mt-auto bg-black text-white">
      {/* Social row */}
      <div className="flex items-center justify-center gap-3 border-b border-white/[0.08] px-9 py-8">
        {SOCIALS.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="grid h-11 w-11 place-items-center rounded-md border border-white/[0.08] transition-colors hover:border-white/30"
          >
            <SocialIcon
              url={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: 22, height: 22 }}
              bgColor="transparent"
              fgColor="#ffffff"
            />
          </a>
        ))}
      </div>

      {/* Bottom row: powered-by Arrived (Happily attribution) */}
      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-9 py-6">
          <a
            href="https://app.happily.events/signup?utm_source=event-page&utm_medium=footer&utm_campaign=signup"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by Happily Arrived"
            className="opacity-90 transition-opacity hover:opacity-100"
          >
            <Image
              src="/powered-by-happily-arrived-alt.svg"
              width={292}
              height={55}
              className="h-16 w-auto object-contain"
              alt="Powered by Happily Arrived"
              draggable={false}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
