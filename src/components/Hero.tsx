import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";
import HlsVideo from "./HlsVideo";

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];
const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.9",
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-bg"
    >
      <Navbar />

      {/* Background HLS Video */}
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo
          src={HLS_SRC}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Michael Smith
        </h1>

        <p className="blur-in text-base md:text-lg text-text-primary/90 mb-4">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          lives in Chicago.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Designing seamless digital interactions by focusing on the unique
          nuances which bring systems to life.
        </p>

        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          <a
            href="#work"
            className="group relative inline-flex items-center rounded-full text-sm px-7 py-3.5 transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full accent-gradient-animated"
              style={{ inset: "-2px" }}
              aria-hidden
            />
            <span className="relative inline-flex items-center bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary rounded-full px-7 py-3.5 -mx-7 -my-3.5 transition-colors duration-300">
              See Works
            </span>
          </a>

          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex items-center rounded-full text-sm px-7 py-3.5 transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full accent-gradient-animated"
              style={{ inset: "-2px" }}
              aria-hidden
            />
            <span className="relative inline-flex items-center bg-bg text-text-primary border-2 border-stroke group-hover:border-transparent rounded-full px-7 py-3.5 -mx-7 -my-3.5 transition-colors duration-300">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <span className="absolute inset-0 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
