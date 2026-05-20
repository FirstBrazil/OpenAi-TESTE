import { useEffect, useState } from "react";

const LINKS = ["Home", "Work", "Resume"] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<(typeof LINKS)[number]>("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <a href="#home" aria-label="Home" className="group relative">
          <span className="block w-9 h-9 rounded-full p-[1.5px] accent-gradient transition-transform duration-300 group-hover:scale-110 group-hover:[transform:rotate(-180deg)_scale(1.1)]">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-bg font-display italic text-[13px] text-text-primary">
              JA
            </span>
          </span>
        </a>

        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Nav links */}
        {LINKS.map((link) => (
          <button
            key={link}
            onClick={() => setActive(link)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
              active === link
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link}
          </button>
        ))}

        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Say hi */}
        <a
          href="mailto:hello@michaelsmith.com"
          className="relative group inline-flex items-center text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary"
        >
          <span
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full accent-gradient-animated"
            style={{ inset: "-2px" }}
            aria-hidden
          />
          <span className="relative inline-flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md -mx-3 sm:-mx-4 -my-1.5 sm:-my-2">
            Say hi
            <span aria-hidden>↗</span>
          </span>
        </a>
      </nav>
    </header>
  );
}
