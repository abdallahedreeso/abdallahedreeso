import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { HeroSection } from "@/components/hero-section";
import { useStoryController, STORIES } from "@/hooks/useStoryController";
import { StoryHeader } from "@/components/story/StoryHeader";
import { StoryOverlayControls } from "@/components/story/StoryOverlayControls";
import { KineticStoryContainer } from "@/components/story/KineticStoryContainer";
import { usePrefetchNextStory } from "@/components/story/usePrefetchNextStory";

// Lazy-loaded story sections to maintain initial JS payload < 101.21 kB
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

// Kinetic Story fallback loader
const SectionLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest animate-pulse">
      Loading Story Chunk...
    </p>
  </div>
);

const Index = () => {
  const {
    activeIndex,
    direction,
    isPaused,
    progress,
    goToStory,
    nextStory,
    prevStory,
    pause,
    resume,
    togglePause,
  } = useStoryController(STORIES.length, 8000);

  // Background idle prefetching of next story
  usePrefetchNextStory(activeIndex);

  const activeStory = STORIES[activeIndex];

  const renderStoryContent = () => {
    switch (activeStory.id) {
      case "hero":
        return <HeroSection />;
      case "about":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      case "skills":
        return <SkillsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      {/* 100vh / 100vw Desktop Story Container with locked root overflow */}
      <div className="h-screen w-screen overflow-hidden bg-background text-foreground relative flex flex-col select-none">
        {/* Top Segmented Progress Bar & Navigation HUD */}
        <StoryHeader
          activeIndex={activeIndex}
          progress={progress}
          isPaused={isPaused}
          onGoToStory={goToStory}
          onTogglePause={togglePause}
          onNext={nextStory}
          onPrev={prevStory}
        />

        {/* Story Viewport with Framer Motion Kinetic Transitions */}
        <main className="relative flex-1 w-full h-full overflow-hidden">
          <KineticStoryContainer storyId={activeStory.id} direction={direction}>
            <Suspense fallback={<SectionLoader />}>
              {renderStoryContent()}
            </Suspense>
          </KineticStoryContainer>

          {/* Dual Hitbox Desktop Overlay (Left 30% Back, Right 70% Next) */}
          <StoryOverlayControls
            onNext={nextStory}
            onPrev={prevStory}
            onPause={pause}
            onResume={resume}
            canPrev={activeIndex > 0}
            canNext={activeIndex < STORIES.length - 1}
          />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
