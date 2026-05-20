import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtext: string;
  cta?: { label: string; href: string };
};

export default function SectionHeader({ eyebrow, title, subtext, cta }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14"
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="block w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-body font-light tracking-tight text-text-primary mb-4">
          {title}
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md">{subtext}</p>
      </div>

      {cta && (
        <a
          href={cta.href}
          className="group relative hidden md:inline-flex items-center self-end rounded-full text-sm px-6 py-3"
        >
          <span
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full accent-gradient-animated"
            style={{ inset: "-2px" }}
            aria-hidden
          />
          <span className="relative inline-flex items-center gap-2 bg-bg border border-stroke group-hover:border-transparent rounded-full px-6 py-3 -mx-6 -my-3 text-text-primary transition-colors">
            {cta.label}
            <span aria-hidden>→</span>
          </span>
        </a>
      )}
    </motion.div>
  );
}
