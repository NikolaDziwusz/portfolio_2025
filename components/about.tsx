"use client"

import {useState, useEffect} from "react"
import {ChevronDown, ChevronRight, Folder, File, Mail, Phone, X} from "lucide-react"

// --- Add simple syntax highlighter ---
function highlightCode(code: string) {
    // Comments
    code = code.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m) =>
        `<span class="text-slate-500">${m}</span>`
    )
    // Keywords
    code = code.replace(
        /\b(const|let|var|function|return|if|else|for|while|switch|case|break|default|import|from|export|class|extends|new|public|private|protected|static|interface|type|enum|implements|readonly|async|await)\b/g,
        `<span class="text-blue-400">$1</span>`
    )
    // Types
    code = code.replace(
        /\b(string|number|boolean|void|any|unknown|never|object|Array|Record|Partial|Pick|Omit|typeof|instanceof)\b/g,
        `<span class="text-purple-400">$1</span>`
    )
    // Strings
    code = code.replace(
        /("[^"]*"|'[^']*'|`[^`]*`)/g,
        `<span class="text-orange-400">$1</span>`
    )
    // Numbers
    code = code.replace(
        /\b(\d+)\b/g,
        `<span class="text-yellow-400">$1</span>`
    )
    // Variable names after const/let/var
    code = code.replace(
        /\b(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
        `<span class="text-blue-400">$1</span> <span class="text-white">$2</span>`
    )
    // Equal signs
    code = code.replace(
        /(\=)/g,
        `<span class="text-slate-300">$1</span>`
    )
    // Array brackets
    code = code.replace(
        /(\[|\])/g,
        `<span class="text-yellow-400">$1</span>`
    )
    // Object brackets
    code = code.replace(
        /(\{|\})/g,
        `<span class="text-yellow-400">$1</span>`
    )
    return code
}

export function About() {
    const [openFolders, setOpenFolders] = useState({
        "personal-info": true,
        education: true,
        contacts: true,
    })
    const [activeFile, setActiveFile] = useState("personal-info")
    const [openTabs, setOpenTabs] = useState(["personal-info"])
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const toggleFolder = (folder: string) => {
        setOpenFolders((prev) => ({
            ...prev,
            [folder]: !prev[folder as keyof typeof prev],
        }))
    }

    const openFile = (fileName: string) => {
        setActiveFile(fileName)
        if (!openTabs.includes(fileName)) {
            setOpenTabs((prev) => [...prev, fileName])
        }
    }

    const closeTab = (fileName: string) => {
        const newTabs = openTabs.filter((tab) => tab !== fileName)
        setOpenTabs(newTabs)
        if (activeFile === fileName) {
            setActiveFile(newTabs[newTabs.length - 1] || "")
        }
    }

    const getFileContent = (fileName: string) => {
        switch (fileName) {
            case "personal-info":
                return `/**
 * About me
 * I am a business psychology graduate with a strong background in social
 * and cognitive psychology, passionate about understanding human behavior.
 * Over the past two years, I have been working in web development, where I
 * combine my analytical skills with a creative approach to problem-solving.
 * 
 * I am eager to continue growing my expertise in web development and IT,
 * leveraging my knowledge of psychology to create user-centric solutions.
 * In addition to my professional pursuits, I am deeply interested in music,
 * from singing to production, which enriches my creative perspective.
 */`
            case "bio":
                return `/**
 * Bio
 * Full-Stack Developer at Samsung
 * Business Psychology Graduate
 * 
 * Currently developing CMS applications for Samsung Global Goals
 * charity initiative. Passionate about combining psychology insights
 * with modern web technologies to create user-centric solutions.
 */`
            case "interests":
                return `/**
 * Interests
 * - Web Development (React, Vue, Node.js)
 * - User Experience Design
 * - Psychology & Human Behavior
 * - Music Production & Singing
 * - Gaming & Interactive Media
 * - Agile Development Methodologies
 */`
            case "high-school":
                return `/**
 * High School Education
 * Completed secondary education with focus on
 * mathematics and sciences, laying foundation
 * for analytical thinking and problem-solving skills.
 */`
            case "university":
                return `/**
 * University Education
 * Master's degree in Business Psychology
 * SWPS University of Humanities and Social Sciences
 * Department of Psychology in Wrocław
 * 2018 – 2023
 * 
 * Specialized in social and cognitive psychology
 * with focus on understanding human behavior in business contexts.
 */`
            default:
                return ""
        }
    }

    return (
        <section className="min-h-screen flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div
                className={`w-full lg:w-80 bg-slate-900/50 border-b lg:border-r lg:border-b-0 border-slate-700/50 flex flex-col transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                style={{transitionDelay: "200ms"}}
            >
                <div className="p-4 border-b border-slate-700/50">
                    <h2 className="text-white font-mono text-sm">Explorer</h2>
                </div>

                <div className="flex-1 p-2 overflow-y-auto">
                    {/* Personal Info */}
                    <div className="mb-2">
                        <button
                            onClick={() => toggleFolder("personal-info")}
                            className="flex items-center space-x-2 text-slate-300 hover:text-white font-mono text-sm w-full text-left p-1 hover:bg-slate-800/50 rounded transition-all duration-200"
                        >
                            {openFolders["personal-info"] ? (
                                <ChevronDown className="w-4 h-4 transition-transform duration-200"/>
                            ) : (
                                <ChevronRight className="w-4 h-4 transition-transform duration-200"/>
                            )}
                            <span>personal-info</span>
                        </button>
                        {openFolders["personal-info"] && (
                            <div
                                style={{transitionDelay: isVisible ? "600ms" : "0ms"}}
                                className="ml-6 mt-1 transition-all duration-500"
                            >
                                <button
                                    onClick={() => openFile("bio")}
                                    className="flex items-center space-x-2 text-slate-400 hover:text-white font-mono text-sm p-1 hover:bg-slate-800/50 rounded w-full text-left transition-all duration-200 hover:scale-105"
                                >
                                    <Folder className="w-4 h-4 text-red-400"/>
                                    <span>bio</span>
                                </button>
                                <button
                                    onClick={() => openFile("interests")}
                                    className="flex items-center space-x-2 text-slate-400 hover:text-white font-mono text-sm p-1 hover:bg-slate-800/50 rounded w-full text-left transition-all duration-200 hover:scale-105"
                                >
                                    <Folder className="w-4 h-4 text-green-400"/>
                                    <span>interests</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Education */}
                    <div className="mb-2">
                        <button
                            onClick={() => toggleFolder("education")}
                            className="flex items-center space-x-2 text-slate-300 hover:text-white font-mono text-sm w-full text-left p-1 hover:bg-slate-800/50 rounded transition-all duration-200"
                        >
                            {openFolders.education ? (
                                <ChevronDown className="w-4 h-4 transition-transform duration-200"/>
                            ) : (
                                <ChevronRight className="w-4 h-4 transition-transform duration-200"/>
                            )}
                            <Folder className="w-4 h-4 text-blue-400"/>
                            <span>education</span>
                        </button>
                        {openFolders.education && (
                            <div
                                style={{transitionDelay: isVisible ? "600ms" : "0ms"}}
                                className="ml-6 mt-1 transition-all duration-500"
                            >
                                <button
                                    onClick={() => openFile("high-school")}
                                    className="flex items-center space-x-2 text-slate-400 hover:text-white font-mono text-sm p-1 hover:bg-slate-800/50 rounded w-full text-left transition-all duration-200 hover:scale-105"
                                >
                                    <File className="w-4 h-4 text-slate-400"/>
                                    <span>high-school</span>
                                </button>
                                <button
                                    onClick={() => openFile("university")}
                                    className="flex items-center space-x-2 text-slate-400 hover:text-white font-mono text-sm p-1 hover:bg-slate-800/50 rounded w-full text-left transition-all duration-200 hover:scale-105"
                                >
                                    <File className="w-4 h-4 text-slate-400"/>
                                    <span>university</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Contacts */}
                    <div className="mb-2">
                        <button
                            onClick={() => toggleFolder("contacts")}
                            className="flex items-center space-x-2 text-slate-300 hover:text-white font-mono text-sm w-full text-left p-1 hover:bg-slate-800/50 rounded transition-all duration-200"
                        >
                            {openFolders.contacts ? (
                                <ChevronDown className="w-4 h-4 transition-transform duration-200"/>
                            ) : (
                                <ChevronRight className="w-4 h-4 transition-transform duration-200"/>
                            )}
                            <span>contacts</span>
                        </button>
                        {openFolders.contacts && (
                            <div
                                style={{transitionDelay: isVisible ? "600ms" : "0ms"}}
                                className="ml-6 mt-1 transition-all duration-500"
                            >
                                <div className="flex items-center space-x-2 text-slate-400 font-mono text-sm p-1">
                                    <Mail className="w-4 h-4"/>
                                    <span className="break-all">nikoladziwusz@gmail.com</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-400 font-mono text-sm p-1">
                                    <Phone className="w-4 h-4"/>
                                    <span>+48 780 086 502</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{transitionDelay: "400ms"}}
            >
                {/* Tabs */}
                <div className="flex border-b border-slate-700/50 bg-slate-900/30 overflow-x-auto">
                    {openTabs.map((tab) => (
                        <div
                            key={tab}
                            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 border-r border-slate-700/50 font-mono text-xs sm:text-sm cursor-pointer whitespace-nowrap transition-all duration-200 ${
                                activeFile === tab
                                    ? "bg-slate-800/50 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                            }`}
                            onClick={() => setActiveFile(tab)}
                        >
                            <span>{tab}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    closeTab(tab)
                                }}
                                className="hover:bg-slate-600 rounded p-0.5 transition-all duration-200 hover:scale-110"
                            >
                                <X className="w-3 h-3"/>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Code Editor */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-x-auto">
                    <div className="flex-1 bg-slate-900/20 min-w-0">
                        {activeFile && (
                            <div className="h-full">
                                <div className="flex lg:flex-row h-full">
                                    {/* Line Numbers */}
                                    <div
                                        className="bg-slate-900/30 px-2 lg:px-4 py-4 border-b lg:border-r lg:border-b-0 border-slate-700/50">
                                        {getFileContent(activeFile)
                                            .split("\n")
                                            .map((_, index) => (
                                                <div key={index}
                                                     className="text-slate-500 font-mono text-xs lg:text-sm leading-6">
                                                    {index + 1}
                                                </div>
                                            ))}
                                    </div>

                                    {/* Code Content */}
                                    <div className="flex-1 p-2 sm:p-4 overflow-auto min-w-0">
                                        <pre
                                            className="text-slate-300 font-mono text-xs lg:text-sm leading-6 whitespace-pre-wrap break-words"
                                            // Use dangerouslySetInnerHTML to render highlighted code
                                            dangerouslySetInnerHTML={{
                                                __html: highlightCode(getFileContent(activeFile)),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel */}
                    <div
                        className="w-full lg:w-[30vw] bg-slate-900/30 border-t lg:border-l lg:border-t-0 border-slate-700/50 p-2 sm:p-4">
                        <h3 className="text-slate-400 font-mono text-xs sm:text-sm mb-4">// Code snippet showcase:</h3>
                        <div className="space-y-4">
                            <div
                                className="bg-slate-800/50 rounded p-2 sm:p-3 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105">
                                <div className="text-teal-400 font-mono text-xs mb-2">React Component</div>
                                <pre className="text-slate-300 font-mono text-xs">
                  {`const Developer = () => {\n  return (\n    <div>\n      <h1>Nikola Dziwusz</h1>\n      <p>Full-stack Developer</p>\n    </div>\n  );\n};`}
                </pre>
                            </div>

                            <div
                                className="bg-slate-800/50 rounded p-2 sm:p-3 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105">
                                <div className="text-orange-400 font-mono text-xs mb-2">Skills Array</div>
                                <pre className="text-slate-300 font-mono text-xs">
                  {`const skills = [\n  'React', 'Vue', 'Node.js',\n  'TypeScript', 'MongoDB',\n  'Psychology', 'UX Research'\n];`}
                </pre>
                            </div>

                            <div
                                className="bg-slate-800/50 rounded p-2 sm:p-3 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105">
                                <div className="text-blue-400 font-mono text-xs mb-2">Experience Object</div>
                                <pre className="text-slate-300 font-mono text-xs">
                  {`const currentRole = {\n  company: 'Samsung',\n  position: 'Full-stack Developer',\n  duration: '2023 - Present',\n  technologies: ['React', 'Node.js']\n};`}
                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
