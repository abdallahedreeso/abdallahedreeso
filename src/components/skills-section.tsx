import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Frontend Frameworks & Ecosystem",
    skills: [
      { name: "Vue.js 3 / Composition API", icon: "💚" },
      { name: "Nuxt.js 3", icon: "💚" },
      { name: "React.js / Next.js", icon: "⚛️" },
    ]
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "TypeScript", icon: "🔷" },
      { name: "JavaScript (ES6+)", icon: "🟨" },
      { name: "HTML5 / CSS3", icon: "🟠" },
    ]
  },
  {
    title: "Styling & UI Systems",
    skills: [
      { name: "Tailwind CSS", icon: "🌊" },
      { name: "Shadcn UI", icon: "🎯" },
      { name: "Ant Design / Vuetify", icon: "💜" },
      { name: "Sass / SCSS", icon: "🎯" },
    ]
  },
  {
    title: "State Architecture & Motion",
    skills: [
      { name: "Framer Motion", icon: "✨" },
      { name: "Pinia / Zustand", icon: "🍍" },
      { name: "TanStack Query", icon: "⚡" },
    ]
  },
  {
    title: "Tools & Testing",
    skills: [
      { name: "Vite / Webpack", icon: "⚡" },
      { name: "Git & GitHub Actions", icon: "🐙" },
      { name: "ESLint / Prettier", icon: "🔍" },
      { name: "Figma UI/UX", icon: "🎨" },
    ]
  },
  {
    title: "Backend & Database Integrations",
    skills: [
      { name: "Supabase / Firebase", icon: "⚡" },
      { name: "Node.js / REST APIs", icon: "🟢" },
      { name: "MongoDB / MySQL", icon: "🍃" },
    ]
  },
];

const tools = [
  "VS Code", "Postman", "Chrome DevTools", "Figma", "Notion", 
  "Git", "Jira", "Vercel", "Netlify", "Linear"
];

export function SkillsSection() {
  return (
    <section id="skills" className="w-full h-full pt-20 pb-20 px-4 lg:px-8 overflow-y-auto allow-inner-scroll">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Technical <span className="bg-gradient-primary bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive domain expertise in modern frontend engineering, responsive component architecture, and spatial interface performance.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card className="border-primary/20 bg-card/60 backdrop-blur-md shadow-lg hover:border-primary/40 transition-all duration-300 h-full">
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold text-primary mb-4 border-b border-primary/10 pb-2">
                    {category.title}
                  </h3>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span>{skill.icon}</span>
                          <span className="font-medium text-foreground">{skill.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools & Software */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-foreground mb-6">
            Ecosystem & <span className="text-primary">Tools</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {tools.map((tool) => (
              <Badge
                key={tool}
                variant="outline"
                className="px-3.5 py-1.5 text-xs border-primary/20 bg-background/50 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-default"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}