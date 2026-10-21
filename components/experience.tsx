import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      company: "Dsplce.co",
      position: "Front-End Developer",
      period: "08/2025 – 12/2025",
      location: "Remote",
      description: "Spearheaded A/B testing experiments with JavaScript, CSS, and ESLint to support conversion-rate optimisation and engagement. Created experiment variations from hypotheses and business requirements, deployed frontend changes across multiple scenarios, and improved the experiment delivery pipeline and maintainability.",
      technologies: ["JavaScript", "CSS", "ESLint", "A/B Testing", "CRO"],
      current: false,
    },
    {
      company: "Freelance",
      position: "Front-end Developer",
      period: "10/2024 – 05/2025",
      location: "Remote",
      description: "Developed accessible, responsive UI components for the ChangingDemocratics platform by styling Radix UI primitives with Tailwind CSS and Styled Components. Built React Context state management, integrated REST APIs, and independently translated Figma designs into performant production components within an agile two-person team.",
      technologies: ["React", "Radix UI", "Tailwind CSS", "Styled Components", "REST APIs", "WCAG"],
      current: false,
    },
    {
      company: "Samsung",
      position: "Full-Stack Developer",
      period: "07/2023 – 12/2024",
      location: "Wrocław",
      description: "Built scalable CMS features with React and Next.js on the frontend and Node.js with NestJS on the backend. Implemented GraphQL queries and mutations with Apollo, managed TypeORM and PostgreSQL schemas, added Cypress component tests, and created reusable Chakra UI components connected to backend data while collaborating in Scrum teams.",
      technologies: ["React", "Next.js", "Node.js", "NestJS", "GraphQL", "Apollo", "PostgreSQL", "TypeORM", "Cypress"],
      current: false,
    },
    {
      company: "Techland",
      position: "UX Researcher",
      period: "10/2022 – 05/2023",
      location: "Wrocław",
      description: "Executed qualitative and quantitative studies, prepared data-driven reports for user-centred design decisions, and coordinated playtests and participant management to streamline research for engineering and design teams.",
      technologies: ["UX Research", "Playtesting", "Data Analysis", "User-Centred Design"],
      current: false,
    },
    {
      company: "BonaSoft",
      position: "Front-end Developer Intern",
      period: "05/2022 – 10/2022",
      location: "Wrocław",
      description: "Learned programming fundamentals through practical Python and software development training. Built interactive features for an internal project-management application with Vue 3, Nuxt.js, and Sass, configured Vite builds, and worked with Git and Scrum in a collaborative team.",
      technologies: ["Vue 3", "Nuxt.js", "Sass", "Vite", "Python", "Git", "Scrum"],
      current: false,
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My journey from psychology graduate to full-stack developer, combining analytical thinking with technical
            expertise.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className={`bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 ${exp.current ? "ring-2 ring-blue-500/20" : ""}`}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      {exp.position}
                      {exp.current && <Badge className="bg-green-600 text-white">Current</Badge>}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
                      {exp.company} • {exp.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{exp.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs border-slate-300 dark:border-slate-600">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
