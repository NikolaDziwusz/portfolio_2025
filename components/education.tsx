import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, BookOpen } from "lucide-react"

export function Education() {
  const education = {
    degree: "Master's Degree in Business Psychology",
    university: "SWPS University of Humanities and Social Sciences",
    department: "Department of Psychology in Wrocław",
    period: "2018 – 2023",
    description:
      "Specialized in social and cognitive psychology with focus on understanding human behavior in business contexts. Developed strong analytical and research skills applicable to user experience and web development.",
  }

  const courses = [
    "Quantitative Data Analysis Advanced course on Methodology & Statistics",
    "Advanced Front-end Development (Udemy)",
    "Web Developer from Scratch (Udemy)",
    "HTML and CSS from Scratch (eduweb)",
    "WWW Creation from Scratch (eduweb)",
  ]

  const languages = [
    { language: "English", level: "B2 Level" },
    { language: "Polish", level: "Native" },
  ]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Education & Learning</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Academic background and continuous learning journey that shaped my approach to technology and user
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Higher Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{education.degree}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{education.university}</p>
              <p className="text-slate-600 dark:text-slate-300 mb-2">{education.department}</p>
              <p className="text-slate-500 dark:text-slate-400 mb-4">{education.period}</p>
              <p className="text-slate-600 dark:text-slate-300">{education.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Languages & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="border-slate-300 dark:border-slate-600">
                        {lang.language} - {lang.level}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Additional</h4>
                  <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                    Driving License: Category B
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Courses & Certificates
            </CardTitle>
            <CardDescription>
              Continuous learning and professional development in web technologies and data analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{course}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
