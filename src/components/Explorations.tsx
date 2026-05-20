import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Item = { image: string; rotate: number };

const COLUMN_A: Item[] = [
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    rotate: -2,
  },
  {
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    rotate: 1.5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    rotate: -1,
  },
];

const COLUMN_B: Item[] = [
  {
    image:
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=800&q=80",
    rotate: 2,
  },
  {
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
    rotate: -1.5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    rotate: 1,
  },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const colARef = useRef<HTMLDivElement | null>(null);
  const colBRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: content,
        pinSpacing: false,
      });

      if (colARef.current) {
        gsap.fromTo(
          colARef.current,
          { y: 200 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      if (colBRef.current) {
        gsap.fromTo(
          colBRef.current,
          { y: -100 },
          {
            y: 300,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explorations"
      className="relative min-h-[300vh] bg-bg"
    >
      {/* Layer 1: Pinned center */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="block w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Explorations
          </span>
          <span className="block w-8 h-px bg-stroke" />
        </div>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-body font-light tracking-tight text-text-primary mb-5">
          Visual <span className="font-display italic">playground</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md mb-10">
          A growing archive of experiments, side quests, and the things that
          don't fit anywhere else.
        </p>

        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex items-center rounded-full text-sm px-6 py-3"
        >
          <span
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full accent-gradient-animated"
            style={{ inset: "-2px" }}
            aria-hidden
          />
          <span className="relative inline-flex items-center gap-2 bg-bg border border-stroke group-hover:border-transparent rounded-full px-6 py-3 -mx-6 -my-3 text-text-primary">
            See Dribbble <span aria-hidden>↗</span>
          </span>
        </a>
      </div>

      {/* Layer 2: Parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 h-full">
          <div className="grid grid-cols-2 gap-12 md:gap-40 h-full">
            <div
              ref={colARef}
              className="flex flex-col gap-12 md:gap-20 pt-[20vh] justify-self-start"
            >
              {COLUMN_A.map((item, i) => (
                <ParallaxCard
                  key={`a-${i}`}
                  item={item}
                  onOpen={() => setLightbox(item.image)}
                />
              ))}
            </div>
            <div
              ref={colBRef}
              className="flex flex-col gap-12 md:gap-20 pt-[40vh] justify-self-end"
            >
              {COLUMN_B.map((item, i) => (
                <ParallaxCard
                  key={`b-${i}`}
                  item={item}
                  onOpen={() => setLightbox(item.image)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              src={lightbox}
              alt=""
              className="max-w-[92vw] max-h-[88vh] object-contain rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ParallaxCard({ item, onOpen }: { item: Item; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ transform: `rotate(${item.rotate}deg)` }}
      className="group relative aspect-square w-full max-w-[320px] bg-surface border border-stroke rounded-2xl overflow-hidden pointer-events-auto transition-transform duration-500 hover:scale-105"
    >
      <img
        src={item.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/30 transition-colors" />
    </button>
  );
}
