import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { CanvasProvider } from "@/components/canvas/canvas-context";
import { NodeCanvas } from "@/components/canvas/node-canvas";
import { CanvasNavigation } from "@/components/canvas/canvas-navigation";
import { MiniMap } from "@/components/canvas/mini-map";

// Lazy-loaded below-the-fold sections
const AboutSection = lazy(() =>
  import("@/components/about-section").then((m) => ({ default: m.AboutSection }))
);
const ProjectsSection = lazy(() =>
  import("@/components/projects-section").then((m) => ({ default: m.ProjectsSection }))
);
const SkillsSection = lazy(() =>
  import("@/components/skills-section").then((m) => ({ default: m.SkillsSection }))
);
const ContactSection = lazy(() =>
  import("@/components/contact-section").then((m) => ({ default: m.ContactSection }))
);

// Fallback loader component for lazy sections inside canvas nodes
const SectionLoader = ({ name }: { name: string }) => (
  <div className="py-20 flex flex-col items-center justify-center space-y-3">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    <span className="font-mono text-xs text-muted-foreground">Initializing {name}...</span>
  </div>
);

const Index = () => {
  const nodesMap = {
    hero: <HeroSection />,
    about: (
      <Suspense fallback={<SectionLoader name="ABOUT_SYSTEM" />}>
        <AboutSection />
      </Suspense>
    ),
    projects: (
      <Suspense fallback={<SectionLoader name="PROJECTS_REGISTRY" />}>
        <ProjectsSection />
      </Suspense>
    ),
    skills: (
      <Suspense fallback={<SectionLoader name="TECH_STACK_MATRIX" />}>
        <SkillsSection />
      </Suspense>
    ),
    contact: (
      <Suspense fallback={<SectionLoader name="COMMUNICATIONS_GATEWAY" />}>
        <ContactSection />
      </Suspense>
    ),
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <CanvasProvider>
        <div className="h-screen w-screen overflow-hidden bg-background text-foreground relative font-sans">
          <Navigation />
          <CanvasNavigation />
          <NodeCanvas nodesMap={nodesMap} />
          <MiniMap />
        </div>
      </CanvasProvider>
    </ThemeProvider>
  );
};

export default Index;
