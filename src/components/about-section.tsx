import { motion } from "framer-motion";
import { Calendar, MapPin, Award, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Frontend Developer",
    company: "SolutionPlus",
    period: "Jul 2024 - Present",
    location: "Cairo, Egypt",
    description: "Frontend developer specializing in Vue.js/Nuxt.js and React.js, known for attention to detail in developing responsive, user-friendly interfaces and integrating APIs for seamless web experiences.",
    achievements: [
      "Contributed to OTAS (Online Travel Agency System) serving travel agencies",
      "Led development of IFTMena (International Federation for Travel)",
      "Contributed to upgrade from Vue 2/Nuxt 2 to Vue 3/Nuxt 3",
      "Collaborated within Agile framework for iterative development"
    ]
  },
  {
    title: "Frontend Intern",
    company: "Algoriza",
    period: "Oct 2023 - Dec 2023",
    location: "Cairo, Egypt",
    description: "Developed comprehensive web applications focusing on user experience and real-time data integration.",
    achievements: [
      "Developed Dream Place room booking web application",
      "Integrated open-source APIs for real-time data updates",
      "Ensured efficient and intuitive booking process",
      "Earned Frontend internship certification"
    ]
  }
];

const certifications = [
  {
    title: "DEPI: React Web Developer",
    url: "https://drive.google.com/file/d/14alTqr449uyQ8qYAnVttMIzcyDklO_P-/view?usp=sharing"
  },
  {
    title: "SolutionPlus: Frontend Internship",
    url: "https://solutionplus.net/certificates/9645762061"
  },
  {
    title: "Algoriza: Frontend Internship (Credential ID: 875001)",
    url: "https://interns.algoriza.com/"
  },
  {
    title: "National Telecommunication Institute (NTI): Web Development",
    url: "https://drive.google.com/file/d/14alTqr449uyQ8qYAnVttMIzcyDklO_P-/view?usp=sharing"
  },
  {
    title: "Coursera (University of Michigan): Frontend Development",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/6UHZGQMSYPV9"
  },
];

const yearsOfExperience = () => {
  return Math.max(1, Math.floor((new Date().getTime() - new Date('2024-07-01').getTime()) / (1000 * 60 * 60 * 24 * 365)));
};

export function AboutSection() {
  return (
    <section id="about" className="w-full h-full pt-20 pb-20 px-4 lg:px-8 overflow-y-auto allow-inner-scroll">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Passionate Frontend Architect with {yearsOfExperience()}+ years of experience building performant,
            scalable, and accessible web systems. Combining strong UX design instincts with robust React & Vue architectures.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-elegant border-primary/20 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Code className="h-5 w-5" />
                  Personal Specs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-1">Name</h4>
                    <p className="text-foreground font-medium">Abdallah Edrees</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-1">Role</h4>
                    <p className="text-foreground font-medium">Frontend Developer</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-1">Experience</h4>
                    <p className="text-foreground font-medium">{yearsOfExperience()}+ Years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-1">Location</h4>
                    <p className="text-foreground font-medium flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      Cairo, Egypt
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Bio</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Dedicated to modern web engineering, responsive user interfaces, and clean component-driven systems.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-elegant border-primary/20 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Award className="h-5 w-5" />
                  Certifications & Track Record
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2.5">
                  {certifications.map((cert) => (
                    <a key={cert.title} href={cert.url} target="_blank" rel="noopener noreferrer" className="block group">
                      <Badge variant="outline" className="w-full justify-start py-2 px-3 border-primary/20 bg-background/40 group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors">
                        <Award className="h-4 w-4 mr-2 text-primary group-hover:scale-110 transition-transform" />
                        <span className="truncate text-xs">{cert.title}</span>
                      </Badge>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Experience Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-6">
            Professional <span className="text-primary">Journey</span>
          </h3>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="border-primary/20 bg-card/60 backdrop-blur-md shadow-elegant hover:border-primary/40 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle className="text-lg text-primary">{exp.title}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold text-foreground">{exp.company}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{exp.description}</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}