import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";

const navItems = [
  { name: "Home", id: "home", index: 0 },
  { name: "About", id: "about", index: 1 },
  { name: "Projects", id: "projects", index: 2 },
  { name: "Skills", id: "skills", index: 3 },
  { name: "Contact", id: "contact", index: 4 },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentSlideIndex, goToSlide } = usePortfolioStore();

  const handleNavClick = (index: number) => {
    goToSlide(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/40 backdrop-blur-xl border-b border-primary/10 shadow-sm"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-primary cursor-pointer flex items-center gap-2"
            onClick={() => handleNavClick(0)}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AE
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-primary/20 px-1.5 py-0.5 rounded font-mono hidden sm:inline-block">
              Keynote Spatial
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentSlideIndex === item.index;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.index)}
                  className={`relative py-1 text-sm font-medium transition-colors group ${
                    isActive ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? "w-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "w-0"
                    } group-hover:w-full`}
                  />
                </button>
              );
            })}
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
                <Button variant="ghost" size="sm" aria-label="Open Navigation Menu">
                  <Menu size={20} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full top-0 right-0 mt-0 w-64 rounded-none border-l border-primary/20 bg-background/95 backdrop-blur-xl">
                <div className="mx-auto w-16 h-2 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500 mt-2" />
                <DrawerHeader>
                  <DrawerTitle>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-2xl font-bold text-primary cursor-pointer text-left"
                      onClick={() => handleNavClick(0)}
                    >
                      AE <span className="text-xs text-muted-foreground font-normal">Spatial</span>
                    </motion.div>
                  </DrawerTitle>
                </DrawerHeader>
                <div className="grid gap-1 p-4">
                  {navItems.map((item) => {
                    const isActive = currentSlideIndex === item.index;
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.index)}
                        className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "text-primary font-semibold bg-primary/10 border border-primary/20"
                            : "text-foreground/80 hover:text-primary hover:bg-muted/40"
                        }`}
                      >
                        <span className="font-mono text-xs text-primary/70 mr-2">0{item.index + 1}</span>
                        {item.name}
                      </button>
                    );
                  })}
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
