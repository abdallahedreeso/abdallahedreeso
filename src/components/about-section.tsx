import { motion } from "framer-motion";
import { Calendar, MapPin, Award, Code, Building, GraduationCap } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";

const experiences = [
  {
    title: "Senior Frontend Developer / Architect",
    company: "SolutionPlus",
    period: "Jul 2024 - Present",
    location: "Cairo, Egypt",
    description: "Architecting high-scale Vue 3/Nuxt 3 enterprise travel platforms. Optimizing WebGL render pipelines, micro-frontend states, and sub-second bundle performance.",
    achievements: [
      "Engineered OTAS (Online Travel Agency System) handling 50k+ daily transactions",
      "Architected IFTMena federation portal architecture",
      "Spearheaded enterprise migration from Vue 2 to Vue 3 Composition API",
      "Implemented strict CI/CD bundle size guards and sub-50ms LCP targets",
    ],
  },
  {
    title: "Frontend Engineering Intern",
    company: "Algoriza",
    period: "Oct 2023 - Dec 2023",
    location: "Cairo, Egypt",
    description: "Developed reactive room booking web applications with real-time API integrations and zero-layout-shift UI components.",
    achievements: [
      "Developed 'My Dream Place' booking portal",
      "Integrated live open-source API data channels",
      "Earned top-tier Algoriza Frontend Excellence Certification",
    ],
  },
];

const education = [
  {
    degree: "B.Sc. in Computer Science & Information Systems",
    institution: "Faculty of Computers and Informatics, Zagazig University",
    period: "2017 - 2021",
    details: "Graduation Project: Smart IoT Library Desktop App & Hardware Embedded System",
  },
  {
    degree: "Frontend Software Engineering Specialization",
    institution: "National Telecommunication Institute (NTI)",
    period: "2023",
    details: "Advanced training in JS engine internals, web performance, and state management",
  },
];

const certifications = [
  {
    title: "DEPI: React Web Developer",
    issuer: "Digital Egypt Pioneers Initiative",
    url: "https://drive.google.com/file/d/14alTqr449uyQ8qYAnVttMIzcyDklO_P-/view?usp=sharing",
  },
  {
    title: "SolutionPlus: Senior Frontend Credential",
    issuer: "SolutionPlus Tech",
    url: "https://solutionplus.net/certificates/9645762061",
  },
  {
    title: "Algoriza: Frontend Engineering (Credential ID: 875001)",
    issuer: "Algoriza Academy",
    url: "https://interns.algoriza.com/",
  },
  {
    title: "University of Michigan: Web Application Architecture",
    issuer: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/6UHZGQMSYPV9",
  },
];

const yearsOfExperience = () => {
  return Math.max(2, Math.floor((new Date().getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24 * 365)));
};

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            Professional Profile
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            Architectural <span className="text-blue-500">Mindset</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            Combining {yearsOfExperience()}+ years of frontend development mastery with deep performance engineering, 
            building scalable web interfaces designed for speed, resilience, and elegance.
          </p>
        </motion.div>

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Core Details */}
          <BentoCard id="about-details" title="Personal Details" badge="Profile" className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 font-sans text-sm">
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono block mb-1">LOCATION</span>
                <span className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-blue-500" /> Cairo, Egypt
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono block mb-1">EXPERIENCE</span>
                <span className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-500" /> {yearsOfExperience()}+ Years
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 col-span-2 sm:col-span-1">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono block mb-1">FOCUS AREA</span>
                <span className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
                  <Code className="h-3.5 w-3.5 text-blue-500" /> WebGL & React/Vue
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Specialized in high-concurrency client architectures, WebGL canvas integrations, and micro-frontend state orchestration. 
              Dedicated to eliminating unnecessary render cycles and crafting fluid, zero-latency user experiences.
            </p>
          </BentoCard>

          {/* Card 2: Certifications */}
          <BentoCard id="about-certs" title="Certifications" badge="Verified" className="md:col-span-1">
            <div className="space-y-2.5 mt-1">
              {certifications.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cert flex items-center justify-between p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Award className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white truncate group-hover/cert:text-blue-500 transition-colors">
                      {cert.title}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* Experience & Education Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Experience Journey */}
          <BentoCard id="about-exp" title="Professional Experience" badge="Career" className="md:col-span-2">
            <div className="space-y-6 mt-2">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l border-blue-500/30 font-sans">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-glow" />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">{exp.title}</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-blue-500 mb-2 flex items-center gap-2">
                    <Building className="h-3.5 w-3.5" /> {exp.company} &bull; {exp.location}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-3">{exp.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Education */}
          <BentoCard id="about-edu" title="Education & Academic" badge="Degree" className="md:col-span-1">
            <div className="space-y-4 mt-2">
              {education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 font-sans">
                  <div className="flex items-center gap-2 mb-1 text-blue-500">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-xs font-mono font-semibold">{edu.period}</span>
                  </div>
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">{edu.degree}</h5>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">{edu.institution}</p>
                  <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">{edu.details}</p>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}