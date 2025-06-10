"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const tabs = [
    { id: "_hello", label: "_hello" },
    { id: "_about-me", label: "_about-me" },
    { id: "_projects", label: "_projects" },
  ]

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block max-h-[10vh] border-b z-50  border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Button */}
            <Button
              variant="ghost"
              className="text-slate-300 font-mono text-sm border-r border-slate-700/50 pr-6 h-16 rounded-none hover:bg-slate-800/30 hover:text-white transition-all"
              onClick={() => setActiveSection("_hello")}
            >
              nikola-dziwusz
            </Button>

            {/* Navigation Tabs */}
            <div className="flex items-center h-16">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`h-16 px-6 rounded-none border-r border-slate-700/50 font-mono text-sm transition-all relative ${
                    activeSection === tab.id
                      ? "text-orange-400 hover:text-orange-400 "
                      : "text-slate-400 hover:text-orange-400  hover:bg-opacity-20"
                  }`}
                  onClick={() => setActiveSection(tab.id)}
                >
                  {tab.label}
                  {activeSection === tab.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 transition-all duration-300"
                      style={{
                        width: mounted ? "100%" : "0%",
                        opacity: mounted ? 1 : 0,
                      }}
                    ></div>
                  )}
                </Button>
              ))}
            </div>

            {/* Contact */}
            <div className="flex items-center h-16">
              <Button
                variant="ghost"
                className={`h-16 px-6 rounded-none font-mono text-sm transition-all relative ${
                  activeSection === "_contact-me"
                    ? "text-orange-400 hover:text-orange-400 "
                    : "text-slate-400 hover:text-orange-400 hover:bg-opacity-20"
                }`}
                onClick={() => setActiveSection("_contact-me")}
              >
                _contact-me
                {activeSection === "_contact-me" && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 transition-all duration-300"
                    style={{
                      width: mounted ? "100%" : "0%",
                      opacity: mounted ? 1 : 0,
                    }}
                  ></div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="block md:hidden border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Button */}
            <Button
              variant="ghost"
              className="text-slate-300 font-mono text-sm p-0 h-auto hover:bg-transparent hover:text-white transition-all"
              onClick={() => setActiveSection("_hello")}
            >
              nikola-dziwusz
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className="pb-4 transition-all duration-300 transform origin-top"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                maxHeight: isMobileMenuOpen ? "300px" : "0px",
              }}
            >
              <div className="space-y-1">
                {tabs.map((tab, index) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    className={`w-full justify-start font-mono text-sm transition-all ${
                      activeSection === tab.id
                        ? "bg-slate-800/50 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                    }`}
                    onClick={() => handleSectionChange(tab.id)}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {tab.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className={`w-full justify-start font-mono text-sm transition-all ${
                    activeSection === "_contact-me"
                      ? "bg-slate-800/50 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                  }`}
                  onClick={() => handleSectionChange("_contact-me")}
                  style={{ transitionDelay: `${tabs.length * 50}ms` }}
                >
                  _contact-me
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
