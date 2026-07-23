import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import chibiEdreeso from "@/assets/chibi-edreeso.webp"
import { useCanvas } from "./canvas/canvas-context"

export function HeroSection() {
  const { panToNode } = useCanvas()

  return (
    <section
      id="home"
      className="flex items-center justify-center relative overflow-hidden py-4"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
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
              className="mb-6"
            >
              <h2 className="text-lg md:text-xl text-muted-foreground mb-3 font-medium">
                Frontend Developer &amp; UI Architect
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Specializing in Vue.js/Nuxt.js and React.js. Known for attention to detail in developing 
                responsive, high-performance web applications and interactive canvas experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6"
            >
              <Button
                size="default"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/resume.pdf'
                  link.download = 'Abdallah_Edrees_Resume.pdf'
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
                size="default"
                className="hover:bg-accent transition-all duration-300"
                onClick={() => panToNode("contact")}
              >
                Get In Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center lg:justify-start space-x-3"
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
                  alt="Abdallah Edrees - Frontend Developer"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-full blur-2xl scale-110" />
            </div>
          </motion.div>
        </div>

        {/* Pan Indicator */}
        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => panToNode("about")}
            className="animate-bounce text-xs font-mono text-muted-foreground flex items-center space-x-1"
          >
            <span>Navigate to About Node</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}