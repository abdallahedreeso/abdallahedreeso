import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { WebGLWrapper } from "@/components/webgl/webgl-wrapper";

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

const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030303] text-neutral-900 dark:text-white relative font-sans selection:bg-blue-500/30 selection:text-blue-500 transition-colors duration-500">
        {/* Continuous WebGL Canvas Layer */}
        <WebGLWrapper />

        {/* DOM Content Layer */}
        <div className="relative z-10">
          <Navigation />
          <main>
            <HeroSection />
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
            </Suspense>
          </main>

          {/* Footer */}
          <footer className="border-t border-neutral-200 dark:border-neutral-800/60 bg-white/80 dark:bg-[#060608]/80 backdrop-blur-md py-8">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <p className="text-neutral-500 text-xs sm:text-sm font-mono">
                &copy; 2026 Abdallah Edrees. Kinetic Developer Canvas &bull; WebGL & React Three Fiber Engine.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
