import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";

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

// Fallback loader component for lazy sections
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground">
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
        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-muted-foreground">
              &copy;2025 Abdallah Edrees. Built with React.js, TypeScript & Shadcn.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
