import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection /> 
          <ContactSection /> 
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
