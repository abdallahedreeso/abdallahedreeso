import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { DesktopWorkspace } from "@/components/os/desktop";
import { BootSequence } from "@/components/os/boot-sequence";

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <DesktopWorkspace />
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Index;

