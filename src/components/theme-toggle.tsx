import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-8 h-8 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-200 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-500"
      aria-label="Toggle dark/light mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-cyan-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}