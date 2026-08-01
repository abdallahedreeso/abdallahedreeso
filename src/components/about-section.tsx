import React from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Award, Code, Briefcase, GraduationCap, Sparkles, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "Frontend Developer",
    company: "Numo Training",
    period: "May 2025 - Present",
    location: "Cairo, Egypt",
    description: "Architecting and delivering enterprise ERP and SaaS solutions across six core modules. Leading frontend development for key product initiatives, building complex UI systems, and applying automated testing and AI-assisted workflows.",
    achievements: [
      "Delivered 40+ production features across six ERP modules: HR, CRM, Platforms, Settings, Tickets, and Executive Dashboard.",
      "Led frontend development for the Numo Medical project, contributing to technical decisions and owning major product feature implementations.",
      "Led the frontend development of the Certificate Template Builder and Approval Letters features, from implementation through backend integration.",
      "Resolved 80+ bugs and delivered continuous improvements across multiple ERP modules, enhancing stability, usability, and maintainability.",
      "Designed and implemented 5+ reusable components to improve consistency and eliminate UI code duplication across the application.",
      "Built responsive, pixel-perfect interfaces from Figma designs with full RTL/LTR and multilingual (i18n) support.",
      "Implemented and tested frontend functionality using Vue Test Utils and Vitest while applying performance optimization techniques including lazy loading and code splitting."
    ]
  },
  {
    title: "Frontend Developer",
    company: "SolutionPlus",
    period: "Apr 2024 - Apr 2025",
    location: "Cairo, Egypt",
    description: "Engineered responsive and maintainable user interfaces for enterprise platforms, led frontend framework migrations, and integrated REST APIs across travel management software.",
    achievements: [
      "Led frontend development for the IFTMena platform, delivering responsive and maintainable interfaces for the International Federation for Travel.",
      "Contributed to the migration of multiple production applications from Vue 2/Nuxt 2 to Vue 3/Nuxt 3, improving maintainability and aligning with modern framework standards.",
      "Mentored frontend interns through onboarding, technical guidance, code reviews, and development best practices.",
      "Implemented reusable UI components and integrated REST APIs across the OTAS (Online Travel Agency System) ecosystem.",
      "Worked on SEO optimization for Nuxt applications, leveraging SSR and frontend performance best practices.",
      "Collaborated with cross-functional teams in Agile/Scrum environments and followed Git Flow for release workflows."
    ]
  },
  {
    title: "Frontend Intern",
    company: "Algoriza",
    period: "Oct 2023 - Dec 2023",
    location: "Cairo, Egypt",
    description: "Developed responsive web applications during a structured frontend internship, focusing on user experience, booking workflows, and API integrations.",
    achievements: [
      'Developed "Dream Place", a room booking web application using Vue.js, Pinia, Tailwind CSS, and third-party APIs.',
      "Built responsive, reusable user interfaces and integrated APIs to support booking workflows."
    ]
  }
]

const education = [
  {
    degree: "Bachelor of Computers and Informatics",
    institution: "Zagazig University",
    period: "2017 – 2021",
    details: "Faculty of Computers and Informatics"
  }
]

const certifications = [
  {
    title: "DEPI: React Web Developer",
    url: "https://drive.google.com/file/d/14alTqr449uyQ8qYAnVttMIzcyDklO_P-/view?usp=sharing"
  },
  {
    title: "National Telecommunication Institute (NTI): Web Development",
    url: "https://drive.google.com/file/d/14alTqr449uyQ8qYAnVttMIzcyDklO_P-/view?usp=sharing"
  },
  {
    title: "Coursera (University of Michigan): Frontend Development",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/6UHZGQMSYPV9"
  }
]

export const AboutSection = React.memo(function AboutSection() {
  return (
    <section id="about" className="py-12 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Frontend Engineer specializing in production ERP and enterprise SaaS applications. Experienced in architecting complex feature workflows, leading Vue 2 to Vue 3 framework migrations, building scalable UI component systems, and leveraging modern AI coding agents across the development lifecycle to deliver maintainable, high-performance web applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="shadow-elegant hover:shadow-glow transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Code className="h-5 w-5 text-primary" />
                  Personal & Professional Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">Name</h4>
                    <p className="text-foreground font-medium">Abdallah Edrees</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">Role</h4>
                    <p className="text-foreground font-medium">Frontend Engineer</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">Experience</h4>
                    <p className="text-foreground font-medium">2+ Years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">Location</h4>
                    <p className="text-foreground font-medium flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      Cairo, Egypt
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Engineering Focus & AI Workflow</h4>
                  <p className="text-foreground leading-relaxed text-sm">
                    Strong focus on reusable component architecture, performance optimization (lazy loading, code splitting), automated testing (Vitest, Vue Test Utils), SEO, and internationalization (i18n, RTL/LTR). Proficient in using AI coding tools and agents (Claude Code, Gemini, Antigravity, Cursor) throughout software development lifecycle—from repository analysis to code reviews and production release.
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 space-y-2">
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Education
                  </h4>
                  {education.map((edu, idx) => (
                    <div key={idx} className="text-xs space-y-0.5">
                      <p className="font-semibold text-foreground">{edu.degree}</p>
                      <p className="text-muted-foreground">{edu.institution} • {edu.period}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-elegant hover:shadow-glow transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Award className="h-5 w-5 text-primary" />
                  Certifications & Credentials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-background/60 hover:bg-primary/5 hover:border-primary/40 dark:bg-muted/40 dark:hover:bg-primary/10 dark:hover:border-primary/50 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/5 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                            <Award className="h-4 w-4 transition-transform group-hover:scale-110" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">
                            {cert.title}
                          </span>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Briefcase className="h-6 w-6 text-primary shrink-0" />
            Professional <span className="text-primary">Experience</span>
          </h3>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-[1.005]">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg md:text-xl font-bold flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span>{exp.title}</span>
                        <span className="text-primary font-semibold">@ {exp.company}</span>
                      </CardTitle>
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md w-fit shrink-0">
                        <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                        {exp.period}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                    <div className="space-y-2 pt-1">
                      <h5 className="font-semibold text-xs text-foreground uppercase tracking-wider">Key Contributions & Achievements:</h5>
                      <ul className="grid md:grid-cols-1 gap-1.5">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                            <span>{achievement}</span>
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
})