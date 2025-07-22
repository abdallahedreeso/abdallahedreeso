import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  {
    title: "Frontend Frameworks & Libraries",
    skills: [
      { name: "Vue.js", icon: "💚" },
      { name: "Nuxt.js", icon: "💚" },
      { name: "React.js", icon: "⚛️" },
    ]
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", icon: "🟨" },
      { name: "TypeScript", icon: "🔷" },
      { name: "HTML5", icon: "🟠" },
      { name: "CSS3", icon: "🔵" },
    ]
  },
  {
    title: "Styling & UI Frameworks",
    skills: [
      { name: "Tailwind CSS", icon: "🌊" },
      { name: "Vuetify", icon: "💜" },
      { name: "Ant Design", icon: "🐜" },
      { name: "Bootstrap", icon: "🅱️" },
      { name: "Sass/SCSS", icon: "🎯" },
    ]
  },
  {
    title: "State Management & Validation",
    skills: [
      { name: "Pinia", icon: "🍍" },
      { name: "Vuex", icon: "📦" },
      { name: "VeeValidate", icon: "✅" },
      { name: "Vuelidate", icon: "✅" },
    ]
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git & GitHub", icon: "🐙" },
      { name: "ESLint", icon: "🔍" },
      { name: "Figma", icon: "🎨" },
      { name: "Vue Test Utils", icon: "🧪" },
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Supabase", icon: "⚡" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "MySQL", icon: "🐬" },
    ]
  },
  {
    title: "Additional Languages",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "Java", icon: "☕" },
      { name: "C++", icon: "🔧" },
      { name: "C", icon: "⚙️" },
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
                          
                        </div>
                        
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
      </div>
    </section>
  )
}