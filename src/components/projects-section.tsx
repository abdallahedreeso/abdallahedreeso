import { motion } from "framer-motion"
import { ExternalLink, Github, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Real-Estate Management",
    description: "A comprehensive real estate management platform for property listings, client management, and transaction handling. Built with modern frontend technologies for optimal user experience.",
    image: "/src/assets/projects/real-state.png",
    tech: ["React.js", "Supabase", "Clerk.js", "AntDesign", "Tailwind"],
    liveDemo: "https://real-estate-management-mu.vercel.app/",
    github: "https://github.com/abdallahedreeso/real-estate-management",
    featured: true
  },
  {
    title: "My Dream Place",
    description: "A comprehensive room booking web application developed during my internship at Algoriza. Features real-time data updates through open-source APIs, ensuring an efficient and intuitive booking process for users.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    tech: ["Vue.js", "Tailwind", "API Integration", "Real-time Updates"],
    liveDemo: "#",
    github: "#",
    featured: true
  },
  
  {
    title: "Headphone Store Landing Page",
    description: "A modern and responsive landing page for a headphone store, featuring elegant design, smooth animations, and optimized performance for better user engagement.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    liveDemo: "#",
    github: "#",
    featured: false
  },
  {
    title: "Tradex Platform",
    description: "A trading platform interface designed for financial operations, featuring real-time data visualization and user-friendly trading tools.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    tech: ["React.js", "TypeScript", "Chart.js", "API Integration"],
    liveDemo: "#",
    github: "#",
    featured: false
  },
  
]

export function ProjectsSection() {
  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in frontend development,
            UI/UX design, and modern web technologies.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group shadow-elegant hover:shadow-glow transition-all duration-500 overflow-hidden hover:scale-[1.02]">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" variant="secondary" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="sm" variant="secondary" className="w-full">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    </a>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Other <span className="text-primary">Projects</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
