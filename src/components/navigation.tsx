import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Layers } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { useCanvas } from "./canvas/canvas-context";
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
  { name: "Hero", nodeId: "hero" },
  { name: "About", nodeId: "about" },
  { name: "Projects", nodeId: "projects" },
  { name: "Skills", nodeId: "skills" },
  { name: "Contact", nodeId: "contact" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeNodeId, panToNode } = useCanvas();

  const handleNavClick = (nodeId: string) => {
    panToNode(nodeId);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick("hero")}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-glow group-hover:scale-105 transition-transform">
              AE
            </div>
            <span className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              CANVAS<span className="text-primary font-normal">_CANVAS</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = activeNodeId === item.nodeId;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.nodeId)}
                  className={`relative text-xs font-mono font-medium transition-colors ${
                    isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
            <div className="h-4 w-px bg-border/60 mx-2" />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Drawer direction="left" open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu size={20} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full top-0 right-0 mt-0 w-64 rounded-none">
                <DrawerHeader>
                  <DrawerTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-primary" />
                    <span>Mind Map Navigator</span>
                  </DrawerTitle>
                </DrawerHeader>
                <div className="grid gap-2 p-4">
                  {navItems.map((item) => (
                    <DrawerClose asChild key={item.name}>
                      <button
                        onClick={() => handleNavClick(item.nodeId)}
                        className={`block w-full text-left px-4 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                          activeNodeId === item.nodeId
                            ? "text-primary font-bold bg-primary/10 border border-primary/20"
                            : "text-foreground hover:bg-muted"
                        }`}
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
