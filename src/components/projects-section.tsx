import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import realestateProject from "@/assets/projects/real-state.png";

const projects = [
  {
    title: "Real-Estate Management Platform",
    description: "A comprehensive real estate management platform for property listings, client management, and transaction handling. Built with modern React & Supabase.",
    image: realestateProject,
    tech: ["React.js", "Supabase", "Clerk.js", "AntDesign", "Tailwind"],
    liveDemo: "https://real-estate-management-mu.vercel.app/",
    github: "https://github.com/abdallahedreeso/real-estate-management",
    featured: true
  },
  {
    title: "My Dream Place",
    description: "A comprehensive room booking web application developed during internship at Algoriza. Features real-time data updates through open-source APIs.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    tech: ["Vue.js", "Tailwind", "API Integration", "Real-time Updates"],
    liveDemo: "https://github.com/abdallahedreeso",
    github: "https://github.com/abdallahedreeso",
    featured: true
  },
  {
    title: "Headphone Store Landing Page",
    description: "A modern and responsive landing page for an audio headphone store, featuring sleek glassmorphic aesthetics and smooth micro-animations.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    liveDemo: "https://github.com/abdallahedreeso",
    github: "https://github.com/abdallahedreeso",
    featured: false
  },
  {
    title: "Tradex Platform",
    description: "A trading platform interface designed for financial operations, featuring real-time data visualization and user-friendly trading tools.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    tech: ["React.js", "TypeScript", "Chart.js", "API Integration"],
    liveDemo: "https://github.com/abdallahedreeso",
    github: "https://github.com/abdallahedreeso",
    featured: false
  },
];

export function ProjectsSection() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="w-full h-full pt-20 pb-20 px-4 lg:px-8 overflow-y-auto allow-inner-scroll">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Architectural projects highlighting reactive interfaces, state architecture, and optimized visual experiences.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="group border-primary/20 bg-card/60 backdrop-blur-md shadow-2xl hover:border-primary/50 transition-all duration-500 overflow-hidden hover:scale-[1.01]">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 text-primary-foreground border border-cyan-400/30 font-mono text-[10px]">
                      Featured Architecture
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" className="w-full bg-primary/80 hover:bg-primary backdrop-blur-md text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        Live Demo
                      </Button>
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" variant="outline" className="w-full border-primary/30 hover:bg-primary/10 text-xs">
                        <Github className="h-3.5 w-3.5 mr-1.5" />
                        Repository
                      </Button>
                    </a>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-[10px] border-primary/20 bg-primary/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-center mb-6">
            Other Key <span className="text-primary">Builds</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={project.title} className="border-primary/20 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-foreground">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
