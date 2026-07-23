import { ThemeProvider } from "@/components/theme-provider";
import { OrbitalHubContainer } from "@/components/orbital-hub/OrbitalHubContainer";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <OrbitalHubContainer />
    </ThemeProvider>
  );
};

export default Index;
