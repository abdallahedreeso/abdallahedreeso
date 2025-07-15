import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import chibiDeveloper from "@/assets/chibi-developer.png"

export function HeroSection() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-subtle relative overflow-hidden"
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              Abdallah{" "}
              <span className="text-primary bg-gradient-primary bg-clip-text text-transparent">
                Edrees
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-xl md:text-2xl text-secondary mb-4">
                Frontend Developer
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Crafting delightful and scalable interfaces with React, Vue & modern web tools.
                Turning ideas into beautiful, interactive experiences.
              </p>
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
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Mail className="h-5 w-5" />
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
                  src={chibiDeveloper}
                  alt="Abdallah Edrees - Frontend Developer"
                  className="w-80 h-80 object-contain"
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
}