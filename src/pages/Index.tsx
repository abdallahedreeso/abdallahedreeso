import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { IDESkeletonLoader } from "@/components/ide/IDESkeletonLoader";

// Lazy-load top-level IDE Layout shell
const IDELayout = lazy(() => import("@/components/ide/IDELayout"));

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="w-screen h-screen overflow-hidden bg-slate-950 text-slate-100">
        <Suspense
          fallback={
            <div className="w-screen h-screen bg-slate-950 flex items-center justify-center p-8">
              <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-xl p-6 shadow-2xl">
                <IDESkeletonLoader />
              </div>
            </div>
          }
        >
          <IDELayout />
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default Index;
