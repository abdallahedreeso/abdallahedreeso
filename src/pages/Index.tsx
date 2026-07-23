import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { SpatialSliderLayout } from "@/components/spatial-slider/spatial-slider-layout";

// Performance Protection: Isolated lazy loaded slide components
const HeroSection = lazy(() =>
  import("@/components/hero-section").then((m) => ({ default: m.HeroSection }))
);
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

// High-tech Cyber-Minimalist Suspense Fallback Loader
const SlideLoader = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
    <div className="relative flex items-center justify-center">
      {/* Pulse glow background */}
      <div className="absolute w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
      {/* Outer spinning ring */}
      <div className="w-12 h-12 border-2 border-primary/20 border-t-primary border-r-cyan-400 rounded-full animate-spin" />
      {/* Inner pulsing core */}
      <div className="absolute w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-ping" />
    </div>
    <span className="mt-4 font-mono text-xs text-primary/80 uppercase tracking-widest animate-pulse">
      Loading Spatial Viewport...
    </span>
  </div>
);

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="w-screen h-screen overflow-hidden bg-background text-foreground relative select-none">
        {/* Spatial Top Navigation Header */}
        <Navigation />

        {/* Spatial Slider Container */}
        <SpatialSliderLayout>
          <Suspense fallback={<SlideLoader />}>
            <HeroSection />
          </Suspense>
          <Suspense fallback={<SlideLoader />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SlideLoader />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<SlideLoader />}>
            <SkillsSection />
          </Suspense>
          <Suspense fallback={<SlideLoader />}>
            <ContactSection />
          </Suspense>
        </SpatialSliderLayout>
      </div>
    </ThemeProvider>
  );
};

export default Index;
