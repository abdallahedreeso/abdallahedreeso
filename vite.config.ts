import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three") || id.includes("@react-three") || id.includes("maath")) {
              return "vendor-three";
            }
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-framer-motion";
            }
            if (id.includes("lucide-react") || id.includes("@radix-ui")) {
              return "vendor-ui";
            }
            if (id.includes("@tanstack") || id.includes("@supabase") || id.includes("zod")) {
              return "vendor-data";
            }
          }
        },
      },
    },
  },
}));
