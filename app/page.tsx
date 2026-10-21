"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Hello } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"

export default function Home() {
  const [activeSection, setActiveSection] = useState("_hello")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSectionChange = (section: string) => {
    if (section === activeSection) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSection(section)
      setIsTransitioning(false)
    }, 300)
  }

  const renderSection = () => {
    switch (activeSection) {
      case "_hello":
        return <Hello />
      case "_about-me":
        return <About />
      case "_projects":
        return <Projects />
      case "_contact-me":
        return <Contact />
      default:
        return <Hello />
    }
  }

  return (
      <main className="min-h-screen min-w-0 max-w-full overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <Navigation activeSection={activeSection} setActiveSection={handleSectionChange} />
        <div className={`min-w-0 overflow-x-hidden transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          {renderSection()}
        </div>
      </main>
  )
}
