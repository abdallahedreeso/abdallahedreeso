import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      
      const sections = navItems.map(item => item.href);
      const currentSection = sections.find(section => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-[#030303]/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800/80 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection("#home")}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-blue-500 text-sm group-hover:bg-blue-500 group-hover:text-white transition-all">
              AE
            </div>
            <span className="font-extrabold text-neutral-900 dark:text-white text-base tracking-tight hidden sm:inline">
              Abdallah Edrees
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative text-xs font-mono tracking-widest uppercase transition-colors ${
                  activeSection === item.href
                    ? "text-blue-500 font-bold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {item.name}
                {activeSection === item.href && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 shadow-glow"
                  />
                )}
              </button>
            ))}
            <div className="pl-4 border-l border-neutral-200 dark:border-neutral-800">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Drawer
              direction="left"
              open={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
            >
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm" className="text-neutral-900 dark:text-white">
                  <Menu size={20} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full top-0 right-0 mt-0 w-64 rounded-none bg-white dark:bg-[#060608] border-l border-neutral-200 dark:border-neutral-800">
                <DrawerHeader className="border-b border-neutral-200 dark:border-neutral-800">
                  <DrawerTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-blue-500 text-sm">
                      AE
                    </div>
                    <span className="font-extrabold text-neutral-900 dark:text-white text-base">
                      Abdallah Edrees
                    </span>
                  </DrawerTitle>
                </DrawerHeader>
                <div className="grid gap-2 p-4">
                  {navItems.map((item) => (
                    <DrawerClose asChild key={item.name}>
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`block w-full text-left px-4 py-2.5 text-xs font-mono tracking-wider uppercase rounded-xl transition-colors ${
                          activeSection === item.href
                            ? "text-blue-500 bg-blue-500/10 font-bold border border-blue-500/20"
                            : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        }`}
                      >
                        {item.name}
                      </button>
                    </DrawerClose>
                  ))}
                </div>
                <DrawerFooter className="mt-auto border-t border-neutral-200 dark:border-neutral-800">
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full text-xs font-mono">
                      Close Menu
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
