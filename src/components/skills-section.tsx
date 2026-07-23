import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";

const skillCategories = [
  {
    id: "skill-1",
    title: "Core Ecosystem & Frameworks",
    subtitle: "PRIMARY ARCHITECTURE",
    badge: "Expertise",
    colSpan: "lg:col-span-2 md:col-span-2",
    skills: [
      { name: "Vue.js / Nuxt 3", icon: "💚", detail: "SSR & Composition API" },
      { name: "React.js / Next.js", icon: "⚛️", detail: "RSC & Custom Hooks" },
      { name: "TypeScript", icon: "🔷", detail: "Strict Type Systems" },
      { name: "JavaScript (ESNext)", icon: "🟨", detail: "Async & Performance" },
    ],
  },
  {
    id: "skill-2",
    title: "Graphics & UI Systems",
    subtitle: "DESIGN ENGINE",
    badge: "Visuals",
    colSpan: "lg:col-span-1 md:col-span-1",
    skills: [
      { name: "Three.js / R3F", icon: "🌐", detail: "WebGL Shaders" },
      { name: "Tailwind CSS", icon: "🌊", detail: "Design Tokens" },
      { name: "Framer Motion", icon: "⚡", detail: "Physics Micro-interactions" },
      { name: "Shadcn / Radix", icon: "🧩", detail: "Accessible Primitives" },
    ],
  },
  {
    id: "skill-3",
    title: "State & Data Validation",
    subtitle: "DATA PIPELINE",
    badge: "State",
    colSpan: "lg:col-span-1 md:col-span-1",
    skills: [
      { name: "Zustand & Pinia", icon: "📦", detail: "Global State Management" },
      { name: "Zod & VeeValidate", icon: "🛡️", detail: "Runtime Schema Guards" },
      { name: "TanStack Query", icon: "🔄", detail: "Async Cache Hydration" },
    ],
  },
  {
    id: "skill-4",
    title: "Backend Integration & Cloud",
    subtitle: "SERVICES & APIS",
    badge: "Infrastructure",
    colSpan: "lg:col-span-2 md:col-span-2",
    skills: [
      { name: "Supabase & Postgres", icon: "⚡", detail: "RLS & Realtime Channels" },
      { name: "Node.js / Express", icon: "🟢", detail: "Microservice APIs" },
      { name: "REST & WebSockets", icon: "📡", detail: "Sub-50ms Latency Streams" },
      { name: "Git & CI/CD Pipelines", icon: "🐙", detail: "Automated Deployments" },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            Technical Competencies
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Architecture <span className="text-blue-500">& Tech Stack</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            Deep technical specialization in modern frontend engineering, low-latency state synchronization, and reactive WebGL interfaces.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <BentoCard
              key={cat.id}
              id={cat.id}
              title={cat.title}
              subtitle={cat.subtitle}
              badge={cat.badge}
              className={cat.colSpan}
            >
              <div className="space-y-3 mt-2">
                {cat.skills.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{s.icon}</span>
                      <span className="text-sm font-semibold text-white">{s.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">{s.detail}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}