import { useState, useEffect, useCallback } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Electric Company Lofts",
    category: "Residential",
    location: "Toronto, ON",
    description:
      "Modern renovation blending minimalism with industrial elements for a downtown loft space.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    title: "Irving Park Bungalow",
    category: "Residential",
    location: "Chicago, IL",
    description:
      "Basement conversion into a productive, light-filled home office and creative studio.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    title: "Lakeside Modern Retreat",
    category: "Residential",
    location: "Muskoka, ON",
    description:
      "Contemporary lakeside home with open-plan living and full 3D scan documentation.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    title: "Financial District Lobby",
    category: "Commercial",
    location: "Toronto, ON",
    description:
      "Premium lobby renovation for a high-rise office tower, designed to impress from the first step.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    title: "Rooftop Garden Suite",
    category: "Hospitality",
    location: "Montreal, QC",
    description:
      "Boutique hotel rooftop terrace with curated landscaping and panoramic city views.",
    image:
      "https://images.unsplash.com/photo-1543674892-7d64d45df18b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 6,
    title: "Scandinavian Studio",
    category: "Residential",
    location: "Vancouver, BC",
    description:
      "Full gut renovation of a downtown studio using clean Scandinavian design principles.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
  },
];

const categoryColor: Record<string, string> = {
  Residential: "bg-twenitu-sage/20 text-twenitu-sage border-twenitu-sage/30",
  Commercial: "bg-twenitu-orange/20 text-twenitu-orange border-twenitu-orange/30",
  Hospitality: "bg-[#c8a96e]/20 text-[#c8a96e] border-[#c8a96e]/30",
};

const ProjectsSection = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sectionRef = useScrollReveal();

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % projects.length),
    []
  );
  const prev = () =>
    setCurrent((c) => (c - 1 + projects.length) % projects.length);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isHovered, next]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section ref={sectionRef} className="py-24 px-8 bg-twenitu-off-white" id="projects">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="reveal mb-12 flex flex-col items-start max-[640px]:items-center max-[640px]:text-center">
          <span className="font-brand-mono text-xs font-semibold tracking-widest uppercase text-twenitu-orange mb-3">
            Our Work
          </span>
          <h2 className="font-brand-mono text-4xl font-bold text-twenitu-navy mb-4 max-[640px]:text-3xl">
            Featured Projects
          </h2>
          <p className="font-brand-sans text-gray-500 text-base max-w-xl leading-relaxed">
            A glimpse into the spaces we've transformed — combining innovation,
            functionality, and lasting aesthetics.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="reveal delay-150 relative overflow-hidden rounded-3xl shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-full shrink-0 relative aspect-video max-[640px]:aspect-4/3"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 max-[640px]:p-5">
                  <span
                    className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border mb-3 ${categoryColor[project.category]}`}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-white font-bold text-3xl leading-tight mb-1 max-[640px]:text-xl">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">{project.location}</p>
                  <p className="text-white/80 text-sm max-w-lg leading-relaxed max-[640px]:hidden">
                    {project.description}
                  </p>
                </div>

                {/* Slide counter */}
                <div className="absolute bottom-8 right-8 text-white/50 text-sm font-medium tabular-nums max-[640px]:bottom-5 max-[640px]:right-5">
                  <span className="text-white text-lg font-bold">{pad(current + 1)}</span>
                  <span className="mx-1">/</span>
                  {pad(projects.length)}
                </div>
              </div>
            ))}
          </div>

          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            aria-label="Previous project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            aria-label="Next project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute top-5 right-8 flex items-center gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;