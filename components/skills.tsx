import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue 3", "Nuxt"],
    },
    {
      title: "Styling & Design",
      skills: ["CSS3", "Responsive Design", "User Experience", "Usability Testing"],
    },
    {
      title: "Tools & Workflow",
      skills: ["Git", "GitHub", "GitLab", "Jira", "Node.js", "Agile/Scrum"],
    },
    {
      title: "Backend & Database",
      skills: ["NestJS", "TypeORM", "GraphQL", "PostgreSQL", "MongoDB", "Python (Basic)"],
    },
    {
      title: "Analytical Skills",
      skills: ["Customer Journey Mapping", "Usability Testing", "Data Analysis", "UX Research"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Skills & Technologies</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks that I use to build exceptional web
            applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700"
            >
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      {skill}
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
