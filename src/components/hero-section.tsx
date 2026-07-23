import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import chibiEdreeso from "@/assets/chibi-edreeso.webp";
import { usePortfolioStore } from "@/store/use-portfolio-store";

export function HeroSection() {
  const { nextSlide, goToSection } = usePortfolioStore();

  return (
    <section
      id="home"
      className="w-full h-full min-h-screen flex items-center justify-center bg-gradient-subtle relative overflow-hidden pt-16 px-4 lg:px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 my-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 tracking-tight"
            >
              Abdallah{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Edrees
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-xl md:text-2xl font-medium text-primary mb-3">
                Lead Frontend Architect & UI Engineer
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Specializing in high-performance web architecture, Vue/Nuxt & React ecosystems. 
                Crafting pixel-perfect spatial web experiences with modern WebGL and motion kinetics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 shadow-lg"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "Abdallah_Edrees_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-accent hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
                onClick={() => goToSection("contact")}
              >
                Get In Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex justify-center lg:justify-start space-x-4"
            >
              <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/10" asChild>
                <a href="https://github.com/abdallahedreeso" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/10" asChild>
                <a href="https://linkedin.com/in/abdallahedreeso/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/10" asChild>
                <a href="mailto:abdallahedreeso2@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Avatar Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <img
                  src={chibiEdreeso}
                  alt="Abdallah Edrees - Frontend Developer"
                  className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-[0_10px_20px_rgba(59,130,246,0.3)]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-primary opacity-25 rounded-full blur-3xl scale-110" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Next Chevron Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            aria-label="Navigate to next slide"
            className="animate-bounce hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full p-2"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}