"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, Github, X, Star, GitFork, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Projects() {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const technologies = [
    {
      name: "React",
      icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z" />
          </svg>
      ),
      color: "#61DAFB",
    },
    {
      name: "HTML",
      icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
          </svg>
      ),
      color: "#E34F26",
    },
    {
      name: "CSS",
      icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
          </svg>
      ),
      color: "#1572B6",
    },
    {
      name: "Vue",
      icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z" />
          </svg>
      ),
      color: "#4FC08D",
    },
    {
      name: "Angular",
      icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.93 12.645h4.134L12 7.98l-2.07 4.665M12 2.5l8.84 3.06-1.351 11.702L12 21.5l-7.489-4.238L3.16 5.56 12 2.5M12 0L0 4.27l1.757 15.22L12 24l10.243-4.51L24 4.27 12 0" />
          </svg>
      ),
      color: "#DD0031",
    },
    {
      name: "TypeScript",
      icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
          </svg>
      ),
      color: "#3178C6",
    },
    {
      name: "JavaScript",
      icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
          </svg>
      ),
      color: "#F7DF1E",
    },
  ]

  const projects = [
    {
      id: 1,
      name: "memo-game",
      subtitle: "_memory-game",
      description:
          "Interactive memory game built with TypeScript. Test your memory skills with engaging gameplay and modern UI design.",
      technologies: ["TypeScript", "HTML", "CSS"],
      github: "https://github.com/NikolaDziwusz/memo-game",
      live: "https://nikoladziwusz.github.io/memo-game/",
      iconColor: "#3178C6",
      icon: "TypeScript",
      status: "Live",
      stars: 12,
      forks: 3,
    },
    {
      id: 2,
      name: "frontend-challenge",
      subtitle: "_development-challenge",
      description:
          "Comprehensive frontend challenge showcasing modern web development practices, responsive design, and clean code architecture.",
      technologies: ["React", "JavaScript", "CSS"],
      github: "https://github.com/NikolaDziwusz/frontend-challenge",
      live: "https://frontend-challenge-9ca3b.web.app/",
      iconColor: "#61DAFB",
      icon: "React",
      status: "Live",
      stars: 8,
      forks: 2,
    },
    {
      id: 3,
      name: "Portfolio",
      subtitle: "_vue-portfolio",
      description:
          "Previous portfolio website built with Vue.js showcasing component-based architecture and modern design patterns.",
      technologies: ["Vue", "JavaScript", "CSS"],
      github: "https://github.com/NikolaDziwusz/Portfolio",
      live: "#",
      iconColor: "#4FC08D",
      icon: "Vue",
      status: "Archived",
      stars: 5,
      forks: 1,
    },
    {
      id: 4,
      name: "BonaAkademia",
      subtitle: "_education-project",
      description:
          "Project developed during BonaAkademi program using Scrum methodology and team collaboration with modern development practices.",
      technologies: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/NikolaDziwusz/Portfolio/tree/main/BonaAkademia/projekt-main",
      live: "#",
      iconColor: "#F7DF1E",
      icon: "JavaScript",
      status: "Completed",
      stars: 15,
      forks: 7,
    },
    {
      id: 5,
      name: "hurryUp",
      subtitle: "_productivity-app",
      description:
          "Time management application with modern UI design, intuitive user experience, and productivity-focused features.",
      technologies: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/NikolaDziwusz/Portfolio/tree/main/HurryUp",
      live: "#",
      iconColor: "#F7DF1E",
      icon: "JavaScript",
      status: "In Progress",
      stars: 6,
      forks: 2,
    },
    {
      id: 6,
      name: "Samsung-CMS",
      subtitle: "_enterprise-project",
      description:
          "CMS application for Samsung Global Goals charity initiative with full-stack implementation and enterprise-level architecture.",
      technologies: ["React", "TypeScript", "CSS"],
      github: "#",
      live: "#",
      iconColor: "#3178C6",
      icon: "React",
      status: "Private",
      stars: 0,
      forks: 0,
    },
  ]

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  const filteredProjects =
      selectedTechnologies.length === 0
          ? projects
          : projects.filter((project) => project.technologies.some((tech) => selectedTechnologies.includes(tech)))

  const getTechnologyIcon = (techName: string) => {
    const tech = technologies.find((t) => t.name === techName)
    return tech ? tech.icon : null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Archived":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Private":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const handleProjectClick = (project: (typeof projects)[0]) => {
    if (project.github !== "#") {
      window.open(project.github, "_blank", "noopener,noreferrer")
    }
  }

  return (
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Sidebar (Desktop/Tablet only) */}
        <div
            className={`hidden lg:flex w-80 bg-slate-900/50 border-r border-slate-700/50 flex-col transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: "200ms" }}
        >
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center space-x-2">
              <span className="text-white font-mono text-sm">Projects</span>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              {technologies.map((tech, index) => (
                  <div
                      key={tech.name}
                      className={`flex items-center space-x-3 transition-all duration-300 ${isVisible ? "animate-in slide-in-from-left" : "opacity-0"}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Checkbox
                        id={tech.name}
                        checked={selectedTechnologies.includes(tech.name)}
                        onCheckedChange={() => handleTechnologyToggle(tech.name)}
                        className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 transition-all duration-200"
                    />
                    <label
                        htmlFor={tech.name}
                        className="flex items-center space-x-2 text-slate-400 hover:text-white font-mono text-sm cursor-pointer transition-all duration-200 hover:scale-105"
                        style={{ color: selectedTechnologies.includes(tech.name) ? tech.color : undefined }}
                    >
                  <span style={{ color: tech.color }} className="transition-all duration-200">
                    {tech.icon}
                  </span>
                      <span>{tech.name}</span>
                    </label>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar (Mobile only) */}
          <div className="flex items-center justify-between lg:hidden border-b bg-slate-900/50 border-r border-slate-700/50  px-4 py-1 sticky top-0 z-30">
            <span className="text-white font-mono text-lg">projects</span>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <button
                    className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    aria-label="Open filters"
                    onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="max-w-xs w-full bg-slate-900 border-r border-slate-700/50">
                <SheetHeader>
                  <SheetTitle className="text-white font-mono text-lg mb-2">Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-3 mt-4">
                  {technologies.map((tech) => (
                      <div key={tech.name} className="flex items-center space-x-3">
                        <Checkbox
                            id={tech.name + "-mobile"}
                            checked={selectedTechnologies.includes(tech.name)}
                            onCheckedChange={() => handleTechnologyToggle(tech.name)}
                            className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 transition-all duration-200"
                        />
                        <label
                            htmlFor={tech.name + "-mobile"}
                            className="flex items-center space-x-2 text-slate-400 hover:text-white font-mono text-base cursor-pointer transition-all duration-200 hover:scale-105"
                            style={{ color: selectedTechnologies.includes(tech.name) ? tech.color : undefined }}
                        >
                          <span style={{ color: tech.color }} className="transition-all duration-200">
                            {tech.icon}
                          </span>
                          <span>{tech.name}</span>
                        </label>
                      </div>
                  ))}
                  {selectedTechnologies.length > 0 && (
                      <Button
                          variant="outline"
                          onClick={() => setSelectedTechnologies([])}
                          className="w-full mt-4 border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700 font-mono transition-all duration-300 hover:scale-105"
                      >
                        Clear filters
                      </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tab */}
          <div className="flex border-b border-slate-700/50 bg-slate-900/30 overflow-x-auto">
            <div
                className={`flex items-center space-x-2 px-4 py-2 border-r border-slate-700/50 bg-slate-800/50 text-white font-mono text-sm whitespace-nowrap transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                }`}
            >
              <span>
                {selectedTechnologies.length > 0 ? selectedTechnologies.join(", ") : "all"}
                {selectedTechnologies.length > 0 ? ` (${filteredProjects.length})` : ""}
              </span>
              {selectedTechnologies.length > 0 && (
                  <button
                      onClick={() => setSelectedTechnologies([])}
                      className="hover:bg-slate-600 rounded p-0.5 transition-all duration-200 hover:scale-110"
                  >
                    <X className="w-3 h-3" />
                  </button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="flex-1 p-4 lg:p-8 bg-slate-900/20 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                  <div
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`group relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all duration-500 backdrop-blur-sm cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/10 ${
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      } ${project.github === "#" ? "cursor-not-allowed opacity-75" : ""}`}
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    {/* Project Header */}
                    <div className="relative h-40 lg:h-48 bg-gradient-to-br from-slate-700/80 to-slate-800/80 overflow-hidden flex items-center justify-center">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full bg-gradient-to-br from-teal-500 to-blue-600 group-hover:scale-110 transition-transform duration-700"></div>
                      </div>

                      {/* Floating Particles Effect */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-pulse"
                                style={{
                                  left: `${20 + i * 15}%`,
                                  top: `${30 + (i % 2) * 40}%`,
                                  animationDelay: `${i * 0.5}s`,
                                }}
                            ></div>
                        ))}
                      </div>

                      {/* Status Badge */}
                      <div
                          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-mono border ${getStatusColor(project.status)} backdrop-blur-sm`}
                      >
                        {project.status}
                      </div>

                      {/* Technology Icon */}
                      <div
                          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 shadow-lg"
                          style={{ backgroundColor: project.iconColor }}
                      >
                        {getTechnologyIcon(project.icon)}
                      </div>

                      {/* Project Name Display */}
                      <div className="text-center z-10 relative">
                        <h3 className="text-white font-mono text-xl lg:text-2xl font-bold mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-teal-300">
                          {project.name}
                        </h3>
                        <p className="text-slate-300 font-mono text-sm group-hover:text-teal-200 transition-colors duration-300">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* GitHub Stats */}
                      {project.github !== "#" && (
                          <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-xs text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{project.stars}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitFork className="w-3 h-3" />
                              <span>{project.forks}</span>
                            </div>
                          </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="relative p-4 lg:p-6 space-y-4">
                      <div>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="bg-slate-700/50 text-teal-400 px-3 py-1 rounded-full text-xs font-mono border border-slate-600/50 transition-all duration-300 group-hover:bg-slate-600/50 group-hover:scale-105 group-hover:border-teal-500/30"
                            >
                        {tech}
                      </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex space-x-3">
                          <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white font-mono p-2 transition-all duration-200 hover:scale-110 hover:bg-slate-700/50"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (project.github !== "#") {
                                  window.open(project.github, "_blank", "noopener,noreferrer")
                                }
                              }}
                              disabled={project.github === "#"}
                          >
                            <Github className="w-4 h-4" />
                          </Button>
                          {project.live !== "#" && (
                              <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-400 hover:text-white font-mono p-2 transition-all duration-200 hover:scale-110 hover:bg-slate-700/50"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(project.live, "_blank", "noopener,noreferrer")
                                  }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                          )}
                        </div>

                        {/* Click Indicator */}
                        {project.github !== "#" && (
                            <div className="text-xs text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              click to view →
                            </div>
                        )}
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-16 animate-in fade-in duration-500">
                  <p className="text-slate-400 font-mono text-lg mb-4">No projects found with selected technologies</p>
                  <Button
                      variant="outline"
                      onClick={() => setSelectedTechnologies([])}
                      className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700 font-mono transition-all duration-300 hover:scale-105"
                  >
                    Clear filters
                  </Button>
                </div>
            )}
          </div>
        </div>
      </section>
  )
}

