import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import chibiEdreeso from "@/assets/chibi-edreeso.webp"

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src={chibiEdreeso}
              alt="404 - Chibi Edreeso"
              className="w-64 h-64 mx-auto mb-6 object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-8xl md:text-9xl font-bold text-primary mb-4"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Looks like this page took a coffee break! Let's get you back to where the action is.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent transition-all duration-300"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="h-5 w-5 mr-2" />
              Return Home
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm text-muted-foreground mt-8"
          >
            Lost? No worries! Even the best developers get lost sometimes 😊
          </motion.p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;
