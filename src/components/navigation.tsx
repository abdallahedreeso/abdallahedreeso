import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => item.href);
      const currentSection = sections.find(section => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
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
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-primary cursor-pointer"
            onClick={() => scrollToSection("#home")}
          >
            AE
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative ${activeSection === item.href ? 'text-primary font-medium' : 'text-foreground'} hover:text-primary transition-colors group`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${activeSection === item.href ? 'w-full' : 'w-0'} group-hover:w-full`} />
              </button>
            ))}
            <ThemeToggle />
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
                <Button variant="ghost" size="sm">
                  <Menu size={20} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full top-0 right-0 mt-0 w-64 rounded-none">
                <div className="mx-auto w-16 h-2 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500" />
                <DrawerHeader>
                  <DrawerTitle>
                    {/* Logo */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-2xl font-bold text-primary cursor-pointer"
                      onClick={() => scrollToSection("#home")}
                    >
                      AE
                    </motion.div>
                  </DrawerTitle>
                </DrawerHeader>
                <div className="grid gap-1 p-4">
                  {navItems.map((item) => (
                    <DrawerClose asChild key={item.name}>
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`block w-full text-left px-4 py-2 ${activeSection === item.href ? 'text-primary font-medium bg-primary/10 rounded-md' : 'text-foreground'} hover:text-primary transition-colors`}
                      >
                        {item.name}
                      </button>
                    </DrawerClose>
                  ))}
                </div>
                <DrawerFooter className="mt-auto">
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
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
