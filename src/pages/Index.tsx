import { ThemeProvider } from "@/components/theme-provider";
import { DesktopWorkspace } from "@/components/os/desktop";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <DesktopWorkspace />
    </ThemeProvider>
  );
};

export default Index;
