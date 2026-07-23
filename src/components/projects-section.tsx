import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import realestateProject from "@/assets/projects/real-state.png";

const projects = [
  {
    id: "proj-1",
    title: "Real-Estate Management Platform",
    subtitle: "FULL-STACK ARCHITECTURE",
    description: "Enterprise property management suite with real-time analytics, user role access control, and seamless database transaction pipelines.",
    image: realestateProject,
    tech: ["React.js", "Supabase", "Clerk", "AntDesign", "Tailwind"],
    liveDemo: "https://real-estate-management-mu.vercel.app/",
    github: "https://github.com/abdallahedreeso/real-estate-management",
    colSpan: "lg:col-span-2 md:col-span-2",
    badge: "Featured Suite",
  },
  {
    id: "proj-2",
    title: "My Dream Place",
    subtitle: "MICRO-INTERACTION SYSTEM",
    description: "Algoriza booking app powered by open-source API pipelines, featuring zero-layout-shift UI states and live search optimization.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    tech: ["Vue.js", "Tailwind", "REST API", "State Machine"],
    liveDemo: "#",
    github: "#",
    colSpan: "lg:col-span-1 md:col-span-1",
    badge: "Booking Engine",
  },
  {
    id: "proj-3",
    title: "Tradex Platform",
    subtitle: "FINANCIAL DATA VISUALIZATION",
    description: "High-throughput financial dashboard rendering sub-millisecond stock chart series with custom WebGL render loops.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    tech: ["React.js", "TypeScript", "Chart.js", "WebSocket"],
    liveDemo: "#",
    github: "#",
    colSpan: "lg:col-span-1 md:col-span-1",
    badge: "FinTech",
  },
  {
    id: "proj-4",
    title: "Acoustic Audio Landing",
    subtitle: "IMMERSIVE LANDING PAGE",
    description: "High-conversion audio product showcase emphasizing fluid CSS keyframe animations, audio dynamic spectral hooks, and 100/100 Lighthouse performance.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
    tech: ["HTML5", "CSS3", "JavaScript", "Audio Web API"],
    liveDemo: "#",
    github: "#",
    colSpan: "lg:col-span-2 md:col-span-2",
    badge: "E-Commerce",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            Bento Grid Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineering <span className="text-blue-500">& Architectures</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            A curated showcase of production applications built with focus on modular code, 
            instant state hydration, and micro-interaction precision.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <BentoCard
              key={project.id}
              id={project.id}
              title={project.title}
              subtitle={project.subtitle}
              badge={project.badge}
              className={project.colSpan}
            >
              <div className="relative mb-4 overflow-hidden rounded-xl group/img">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-56 object-cover rounded-xl transition-transform duration-500 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80" />
              </div>

              <p className="text-sm text-neutral-300 mb-4 leading-relaxed font-sans">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.liveDemo !== "#" && (
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs border border-blue-400/30"
                    asChild
                  >
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Live Demo
                    </a>
                  </Button>
                )}
                {project.github !== "#" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-neutral-700 bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800 text-xs"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5 mr-1.5" /> Source Code
                    </a>
                  </Button>
                )}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
