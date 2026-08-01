import React from "react"
import { motion } from "framer-motion"
import { 
  Code2, 
  Database, 
  Layers, 
  ShieldCheck, 
  TestTube2, 
  Sparkles, 
  Wrench, 
  Globe, 
  Cpu,
  Bot
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SkillCategory {
  title: string
  icon: React.ElementType
  color: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Core & Frameworks",
    icon: Code2,
    color: "text-cyan-500 dark:text-cyan-400",
    skills: ["Vue.js", "Nuxt.js", "React.js", "TypeScript", "JavaScript", "Inertia.js", "HTML5", "CSS3"]
  },
  {
    title: "State & Data Management",
    icon: Database,
    color: "text-blue-500 dark:text-blue-400",
    skills: ["Pinia", "Vuex", "TanStack Query", "Vue Query"]
  },
  {
    title: "UI & Styling Systems",
    icon: Layers,
    color: "text-indigo-500 dark:text-indigo-400",
    skills: ["Tailwind CSS", "Shadcn UI", "Vuetify", "Reka UI", "Ant Design", "Sass"]
  },
  {
    title: "Testing & Quality Assurance",
    icon: TestTube2,
    color: "text-emerald-500 dark:text-emerald-400",
    skills: ["Vue Test Utils", "Vitest"]
  },
  {
    title: "Authentication & Security",
    icon: ShieldCheck,
    color: "text-amber-500 dark:text-amber-400",
    skills: ["JWT", "Laravel Sanctum", "OAuth", "Clerk.js"]
  },
  {
    title: "Architecture & Web Performance",
    icon: Globe,
    color: "text-sky-500 dark:text-sky-400",
    skills: [
      "Component Architecture", "Design Systems", "Responsive Design", "SPA", "SSR", "CSR", 
      "REST APIs", "Performance Optimization", "Code Splitting", "Lazy Loading", "Accessibility", 
      "SEO", "i18n", "RTL/LTR"
    ]
  },
  {
    title: "Developer Tools & DevOps",
    icon: Wrench,
    color: "text-purple-500 dark:text-purple-400",
    skills: ["Git", "GitHub", "GitHub Actions", "Git Flow", "Vite", "ESLint", "Figma", "Vercel", "Netlify"]
  },
  {
    title: "Backend & Databases",
    icon: Cpu,
    color: "text-teal-500 dark:text-teal-400",
    skills: ["Node.js", "Express.js", "MongoDB", "MySQL", "Supabase"]
  }
]

const aiTools = [
  "Claude Code", "Antigravity", "Gemini", "Cursor", "ChatGPT", "Prompt Engineering"
]

const aiWorkflows = [
  "AI Coding Agents", "Repository Analysis", "Technical Planning", 
  "Automated Code Review", "Technical Documentation", "AI-Assisted SDLC"
]

export const SkillsSection = React.memo(function SkillsSection() {
  return (
    <section id="skills" className="py-12 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Technical <span className="text-primary">Skills & Stack</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive breakdown of my technical capabilities, component-driven frontend architecture, testing frameworks, and modern AI-assisted engineering workflows.
          </p>
        </motion.div>

        {/* AI Spotlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <Card className="border-primary/30 bg-gradient-to-r from-cyan-500/5 via-primary/5 to-purple-500/5 shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5 text-xl text-primary">
                <Bot className="h-6 w-6 text-primary animate-pulse" />
                AI-Assisted Development & Engineering Workflows
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Leveraging state-of-the-art AI coding tools and autonomous agents across the software development lifecycle—from repository analysis and technical planning to implementation, code review, and documentation.
              </p>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    AI Tools & Assistant Ecosystem
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {aiTools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs py-1">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-primary" />
                    AI-Driven Engineering Practices
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {aiWorkflows.map((practice) => (
                      <Badge key={practice} variant="outline" className="text-foreground border-border/80 text-xs py-1">
                        {practice}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.05 }}
              >
                <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-[1.01] h-full flex flex-col justify-start">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2.5 text-lg font-bold">
                      <Icon className={`h-5 w-5 ${category.color}`} />
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="bg-muted/60 hover:bg-accent text-foreground text-xs py-1 px-2.5 transition-colors cursor-default font-medium"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
})