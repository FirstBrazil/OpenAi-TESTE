import { useEffect, useRef } from "react";
import gsap from "gsap";
import HlsVideo from "./HlsVideo";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const MARQUEE_TEXT = "BUILDING THE FUTURE • ";

const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      {/* Background video (flipped) */}
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo
          src={HLS_SRC}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Marquee */}
        <div className="overflow-hidden whitespace-nowrap mb-16 md:mb-24 -mx-6 md:-mx-10 lg:-mx-16">
          <div
            ref={marqueeRef}
            className="inline-flex whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/90 px-4"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="px-2">
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">
            Get in touch
          </p>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-10">
            Let's create together.
          </h3>
          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex items-center rounded-full text-sm md:text-base px-8 py-4"
          >
            <span
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full accent-gradient-animated"
              style={{ inset: "-2px" }}
              aria-hidden
            />
            <span className="relative inline-flex items-center gap-2 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary rounded-full px-8 py-4 -mx-8 -my-4 transition-colors">
              hello@michaelsmith.com <span aria-hidden>↗</span>
            </span>
          </a>
        </div>

        {/* Footer bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-stroke">
          <div className="flex flex-wrap gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted uppercase tracking-[0.2em] hover:text-text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-muted uppercase tracking-[0.2em]">
              Available for projects
            </span>
          </div>
        </div>

        <p className="mt-8 text-[10px] text-muted/70 uppercase tracking-[0.3em] text-center md:text-left">
          © {new Date().getFullYear()} Michael Smith — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
