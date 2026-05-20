import SectionHeader from "./SectionHeader";

type Project = {
  title: string;
  image: string;
  span: string;
  aspect: string;
};

const PROJECTS: Project[] = [
  {
    title: "Automotive Motion",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Urban Architecture",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Human Perspective",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Brand Identity",
    image:
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title={
            <>
              Featured <span className="font-display italic">projects</span>
            </>
          }
          subtext="A selection of projects I've worked on, from concept to launch."
          cta={{ label: "View all work", href: "#" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href="#"
      className={`group relative bg-surface border border-stroke rounded-3xl overflow-hidden ${project.span} ${project.aspect}`}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Halftone */}
      <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply pointer-events-none" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-500" />

      {/* Hover label */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="relative inline-flex">
          <span
            className="absolute rounded-full accent-gradient-animated"
            style={{ inset: "-2px" }}
            aria-hidden
          />
          <span className="relative inline-flex items-center gap-2 bg-white text-bg rounded-full px-5 py-2.5 text-sm">
            View — <span className="font-display italic">{project.title}</span>
          </span>
        </span>
      </div>
    </a>
  );
}
