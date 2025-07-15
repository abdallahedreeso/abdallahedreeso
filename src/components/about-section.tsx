import { motion } from "framer-motion"
import { Calendar, MapPin, Award, Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    location: "Remote",
    description: "Leading frontend development for enterprise applications using React, TypeScript, and modern web technologies.",
    achievements: ["Led team of 4 developers", "Improved app performance by 40%", "Implemented new design system"]
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2020 - 2022",
    location: "Cairo, Egypt",
    description: "Developed responsive web applications and collaborated with design teams to create stunning user experiences.",
    achievements: ["Built 15+ client websites", "Reduced load times by 60%", "Mentored junior developers"]
  },
  {
    title: "Junior Web Developer",
    company: "Startup Hub",
    period: "2019 - 2020",
    location: "Alexandria, Egypt",
    description: "Started my journey in web development, focusing on JavaScript fundamentals and modern frameworks.",
    achievements: ["Completed 25+ projects", "Learned React & Vue.js", "Built first portfolio"]
  }
]

const certifications = [
  "React Professional Certification",
  "Vue.js Advanced Patterns",
  "AWS Frontend Development",
  "Google Web Vitals Expert"
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate frontend developer with over 4 years of experience creating beautiful,
            functional, and user-friendly web applications. I love turning complex problems into
            simple, elegant solutions that users enjoy interacting with.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-elegant hover:shadow-glow transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Name</h4>
                    <p className="text-foreground">Abdallah Edrees</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Role</h4>
                    <p className="text-foreground">Frontend Developer</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Experience</h4>
                    <p className="text-foreground">4+ Years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Location</h4>
                    <p className="text-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Egypt
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">About</h4>
                  <p className="text-foreground leading-relaxed">
                    I specialize in creating responsive, accessible, and performant web applications.
                    When I'm not coding, you'll find me exploring new technologies, contributing to
                    open source projects, or sharing knowledge with the developer community.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-elegant hover:shadow-glow transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certifications & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Badge variant="secondary" className="w-full justify-start py-2 px-3">
                        <Award className="h-4 w-4 mr-2" />
                        {cert}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Professional <span className="text-primary">Journey</span>
          </h3>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-primary">{exp.company}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-sm">Key Achievements:</h5>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}