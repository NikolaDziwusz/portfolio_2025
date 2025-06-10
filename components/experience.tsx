import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      company: "Samsung",
      position: "Full-Stack Developer",
      period: "07.2023 – Currently",
      location: "Wrocław",
      description:
        "Developed and maintained a CMS web application for Samsung Global Goals charity application. Collaborated with cross-functional teams including designers, product managers, and developers. Implemented both front-end and back-end features using React, Node.js, and MongoDB. Conducted code reviews, optimized performance, and participated in agile methodology including daily stand-ups and sprint planning.",
      technologies: ["React", "Node.js", "MongoDB", "TypeScript", "Agile/Scrum"],
      current: true,
    },
    {
      company: "BonaSoft",
      position: "Front-End Developer",
      period: "05.2022 – 10.2022",
      location: "Wrocław",
      description:
        "Participated in the BonaAkademi program, a comprehensive training program for Front-end development. Completed theoretical training and practical project development using Scrum methodology. Gained hands-on experience with modern frontend technologies and development practices.",
      technologies: ["JavaScript", "HTML", "CSS", "Scrum", "Frontend Development"],
      current: false,
    },
    {
      company: "Techland",
      position: "UX Researcher",
      period: "07.2021 – 10.2022",
      location: "Wrocław",
      description:
        "Assisted with execution of playtests, including testing features, managing hardware/software setups, and participant management. Analyzed survey results (qualitative and quantitative) and gameplay videos for valuable insights. Prepared comprehensive reports and presentations for stakeholders.",
      technologies: ["UX Research", "Data Analysis", "Usability Testing", "User Behavior Analysis"],
      current: false,
    },
    {
      company: "NOjam",
      position: "Creator & Project Lead",
      period: "10.2019 – 03.2020",
      location: "University Project",
      description:
        "Created a gamification-based mobile application prototype to encourage public transport usage and reduce traffic congestion. Collaborated with UX design student to develop an interactive prototype based on gamification theory and psychological principles.",
      technologies: ["Gamification", "UX Design", "Mobile App Design", "Psychology"],
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
