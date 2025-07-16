import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  {
    title: "Frontend Frameworks & Libraries",
    skills: [
      { name: "Vue.js", level: 95, icon: "💚" },
      { name: "Nuxt.js", level: 95, icon: "💚" },
      { name: "React.js", level: 90, icon: "⚛️" },
      { name: "jQuery", level: 85, icon: "📘" },
    ]
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 95, icon: "🟨" },
      { name: "TypeScript", level: 90, icon: "🔷" },
      { name: "HTML5", level: 98, icon: "🟠" },
      { name: "CSS3", level: 95, icon: "🔵" },
    ]
  },
  {
    title: "Styling & UI Frameworks",
    skills: [
      { name: "Tailwind CSS", level: 95, icon: "🌊" },
      { name: "Vuetify", level: 90, icon: "💜" },
      { name: "Ant Design", level: 85, icon: "🐜" },
      { name: "Bootstrap", level: 90, icon: "🅱️" },
      { name: "Sass/SCSS", level: 90, icon: "🎯" },
    ]
  },
  {
    title: "State Management & Validation",
    skills: [
      { name: "Pinia", level: 95, icon: "🍍" },
      { name: "Vuex", level: 90, icon: "📦" },
      { name: "VeeValidate", level: 85, icon: "✅" },
      { name: "Vuelidate", level: 85, icon: "✅" },
    ]
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git & GitHub", level: 95, icon: "🐙" },
      { name: "ESLint", level: 85, icon: "🔍" },
      { name: "Figma", level: 85, icon: "🎨" },
      { name: "Vue Test Utils", level: 80, icon: "🧪" },
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Supabase", level: 85, icon: "⚡" },
      { name: "Node.js", level: 75, icon: "🟢" },
      { name: "Express", level: 70, icon: "🚂" },
      { name: "MongoDB", level: 70, icon: "🍃" },
      { name: "MySQL", level: 70, icon: "🐬" },
    ]
  },
  {
    title: "Additional Languages",
    skills: [
      { name: "Python", level: 65, icon: "🐍" },
      { name: "Java", level: 60, icon: "☕" },
      { name: "C++", level: 60, icon: "🔧" },
      { name: "C", level: 60, icon: "⚙️" },
    ]
  }
]

const tools = [
  "VS Code", "Postman", "Chrome DevTools", "Figma", "Notion", 
  "Slack", "Jira", "Linear", "Vercel", "Netlify"
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Skills & <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm passionate about staying up-to-date with the latest technologies and continuously
            improving my skill set to deliver cutting-edge solutions.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-[1.02] h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="font-medium text-foreground">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2"
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools & Software */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-foreground mb-8">
            Tools & <span className="text-primary">Software</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge 
                  variant="secondary" 
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tool}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto shadow-elegant">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Currently <span className="text-primary">Learning</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm always expanding my knowledge and staying current with the latest trends
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Three.js", "WebGL", "GraphQL", "Rust", "Web3", "AI/ML"].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge 
                      className="px-3 py-1 bg-gradient-primary text-primary-foreground hover:shadow-glow transition-shadow"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}