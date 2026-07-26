import React from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import chibiEdreeso from "@/assets/chibi-edreeso.webp"

export const HeroSection = React.memo(function HeroSection() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-subtle relative overflow-hidden pt-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Terminal Command Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-xs font-mono mb-4 text-emerald-600 dark:text-emerald-400"
            >
              <span className="font-bold">$</span>
              <span className="text-foreground">abdallah --profile</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Abdallah{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Edrees
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6 font-mono text-xs md:text-sm text-left max-w-lg mx-auto lg:mx-0 bg-muted/30 p-4 rounded-xl border border-border/60 backdrop-blur-sm space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="w-24 shrink-0 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">ROLE</span>
                <span className="text-foreground font-medium">Frontend Engineer <span className="text-muted-foreground text-xs font-normal">(2+ years exp)</span></span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="w-24 shrink-0 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">FOCUS</span>
                <span className="text-foreground">Scalable Web Applications</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="w-24 shrink-0 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">STACK</span>
                <span className="text-foreground">Vue.js · Nuxt.js · React.js · TypeScript · Inertia.js</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="w-24 shrink-0 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">SPECIALTY</span>
                <span className="text-foreground">Component Architecture · Performance · UI Engineering</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="w-24 shrink-0 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">AI</span>
                <span className="text-foreground">AI Tools · Coding Agents · Technical Planning</span>
              </div>

              <div className="pt-2 mt-2 border-t border-border/40 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="w-24 shrink-0 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">STATUS</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">Building. Shipping. Improving.</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/Abdallah_Edrees_Frontend_CV.pdf'
                  link.download = 'Abdallah_Edrees_Frontend_CV.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-accent transition-all duration-300"
                onClick={() => {
                  const contactSection = document.querySelector("#contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Get In Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center lg:justify-start space-x-4"
            >
              <Button variant="ghost" size="sm" className="hover:text-primary" asChild>
                <a href="https://github.com/abdallahedreeso" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary" asChild>
                <a href="https://linkedin.com/in/abdallahedreeso/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary" asChild>
                <a href="mailto:abdallahedreeso2@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <img
                  src={chibiEdreeso}
                  alt="Abdallah Edrees - Frontend Engineer"
                  decoding="async"
                  width={320}
                  height={320}
                  className="w-64 h-64 md:w-80 md:h-80 object-contain"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-full blur-2xl scale-110" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToNext}
            className="animate-bounce"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
})