import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

type Entry = {
  title: string;
  image: string;
  readTime: string;
  date: string;
};

const ENTRIES: Entry[] = [
  {
    title: "Designing motion that feels inevitable",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80",
    readTime: "5 min read",
    date: "May 12, 2026",
  },
  {
    title: "Systems over screens — building scalable UI",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
    readTime: "8 min read",
    date: "April 28, 2026",
  },
  {
    title: "The case for slower interfaces",
    image:
      "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=400&q=80",
    readTime: "4 min read",
    date: "April 10, 2026",
  },
  {
    title: "Notes on typography in the age of variables",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80",
    readTime: "6 min read",
    date: "March 22, 2026",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          title={
            <>
              Recent <span className="font-display italic">thoughts</span>
            </>
          }
          subtext="Writing on design, engineering, and the spaces in between."
          cta={{ label: "View all", href: "#" }}
        />

        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.06,
              }}
              className="group flex items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors"
            >
              <img
                src={entry.image}
                alt=""
                loading="lazy"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg text-text-primary truncate group-hover:translate-x-1 transition-transform duration-300">
                  {entry.title}
                </h3>
                <p className="text-xs text-muted mt-0.5">{entry.readTime}</p>
              </div>
              <span className="text-xs text-muted hidden sm:block pr-4 whitespace-nowrap">
                {entry.date}
              </span>
              <span
                aria-hidden
                className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full border border-stroke text-muted group-hover:text-text-primary group-hover:border-text-primary transition-colors mr-1"
              >
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
