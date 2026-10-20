"use client"

import {useState, useEffect} from "react"
import {ChevronDown, ChevronRight, Folder, File, Mail, Phone, X} from "lucide-react"

// --- Use PrismJS for syntax highlighting ---
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css"; // You can use a different Prism theme or your own

function highlightCode(code: string, language: string = "typescript") {
    // Prism will escape HTML for us
    if (Prism.languages[language]) {
        return Prism.highlight(code, Prism.languages[language], language);
    }
    return code;
}

// Add this mapping near the top, after highlightCode
const codeSnippets: Record<string, { title: string; code: string; color: string }> = {
    "experience": {
        title: "Experience Summary",
        color: "text-cyan-400",
        code: `const experience = {
  current: "Samsung · Full-stack developer",
  focus: ["React", "Node.js", "MongoDB", "Agile/Scrum"]
};`
    },
    "personal-info": {
        title: "About Object",
        color: "text-teal-400",
        code: `const about = {
  name: "Nikola Dziwusz",
  profession: "Business Psychology Graduate",
  focus: ["social psychology", "cognitive psychology"],
  passion: "understanding human behavior"
};`
    },
    "bio": {
        title: "Bio Function",
        color: "text-orange-400",
        code: `function getBio() {
  return {
    company: "Samsung",
    position: "Full-Stack Developer",
    education: "Business Psychology Graduate"
  };
}`
    },
    "interests": {
        title: "Interests Array",
        color: "text-green-400",
        code: `const interests = [
  "Web Development",
  "UX Design",
  "Psychology",
  "Music Production",
  "Gaming"
];`
    },
    "high-school": {
        title: "High School Object",
        color: "text-blue-400",
        code: `const highSchool = {
  focus: ["mathematics", "sciences"],
  skills: ["analytical thinking", "problem-solving"]
};`
    },
    "university": {
        title: "University Object",
        color: "text-purple-400",
        code: `const university = {
  degree: "Master's",
  major: "Business Psychology",
  school: "SWPS University",
  years: "2018 – 2023"
};`
    }
    // ...add more if needed...
};

export function About() {
    const [openFolders, setOpenFolders] = useState({
        "personal-info": true,
        experience: true,
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
                return `<div class='space-y-2'>
  <div class='flex items-center gap-2 text-lg font-bold text-teal-300'>
    <span role='img' aria-label='About'>👤</span> About Me
  </div>
  <div class='text-slate-300'>
                    <span class='font-semibold text-yellow-300'>Front-End Developer</span> with 3 years of experience building scalable web applications with <span class='text-pink-400'>React</span>, <span class='text-blue-400'>Next.js</span> and <span class='text-cyan-400'>TypeScript</span>.<br/>
    <span class='font-semibold text-orange-300'>Full-stack capable</span>, with hands-on experience in Node.js, NestJS, GraphQL, PostgreSQL and backend integrations.<br/>
    <span class='text-slate-300'>I combine technical expertise with a Master's degree in Business Psychology to create intuitive, accessible and maintainable user-centred products.</span>
  </div>
  <ul class='list-disc ml-6 text-slate-400'>
    <li>Focused on performance, accessibility and maintainable architecture</li>
    <li>Open to Front-End and Full-Stack roles (Remote/Hybrid)</li>
    <li>Analytical, adaptable and strongly user-centred</li>
  </ul>
</div>`
            case "bio":
                return `<div class='space-y-2'>
  <div class='flex items-center gap-2 text-lg font-bold text-orange-400'>
    <span role='img' aria-label='Bio'>📝</span> Bio
  </div>
  <div class='text-slate-300'>
    <span class='font-semibold text-blue-300'>Front-End Developer</span> with <span class='bg-blue-900/60 px-2 py-1 rounded text-blue-200'>3 years of experience</span><br/>
    <span class='font-semibold text-yellow-300'>Master's degree in Business Psychology</span>
  </div>
  <div class='text-slate-400'>
    <span class='italic'>Building</span> <span class='text-pink-400'>accessible, responsive applications</span> with <span class='text-blue-400'>React, Next.js and TypeScript</span>.<br/>
    <span class='text-green-400'>Experienced</span> with <span class='text-purple-400'>full-stack integrations</span>, testing, APIs and data-driven product decisions.
  </div>
</div>`
            case "experience":
                return `<div class='space-y-4'>
  <div class='flex items-center gap-2 text-lg font-bold text-cyan-300'>Experience</div>
  <article class='border-l-2 border-cyan-400/60 pl-3'>
    <div class='font-semibold text-white'>Front-End Developer · Dsplce.co</div>
    <div class='text-green-400 text-sm'>08/2025 – 12/2025 · Remote</div>
    <p class='text-slate-400 mt-1'>Led A/B testing experiments, created variations from business hypotheses, deployed frontend changes and improved the experiment delivery pipeline.</p>
  </article>
  <article class='border-l-2 border-blue-400/60 pl-3'>
    <div class='font-semibold text-white'>Front-end Developer · Freelance</div>
    <div class='text-blue-300 text-sm'>10/2024 – 05/2025 · Remote</div>
    <p class='text-slate-400 mt-1'>Built accessible responsive UI with React, Radix UI, Tailwind CSS and Styled Components, integrated REST APIs and translated Figma designs into production components.</p>
  </article>
  <article class='border-l-2 border-purple-400/60 pl-3'>
    <div class='font-semibold text-white'>Full-Stack Developer · Samsung</div>
    <div class='text-purple-300 text-sm'>07/2023 – 12/2024 · Wrocław</div>
    <p class='text-slate-400 mt-1'>Built CMS features with React, Next.js, Node.js and NestJS, using GraphQL, Apollo, TypeORM and PostgreSQL with Cypress tests and reusable Chakra UI components.</p>
  </article>
  <article class='border-l-2 border-orange-400/60 pl-3'>
    <div class='font-semibold text-white'>UX Researcher · Techland</div>
    <div class='text-orange-300 text-sm'>10/2022 – 05/2023 · Wrocław</div>
    <p class='text-slate-400 mt-1'>Executed qualitative and quantitative studies, coordinated playtests and prepared data-driven reports for engineering and design teams.</p>
  </article>
  <article class='border-l-2 border-green-400/60 pl-3'>
    <div class='font-semibold text-white'>Front-end Developer Intern · BonaSoft</div>
    <div class='text-green-300 text-sm'>05/2022 – 10/2022 · Wrocław</div>
    <p class='text-slate-400 mt-1'>Built features with Vue 3, Nuxt.js and Sass, configured Vite builds and gained experience with Git and Scrum workflows.</p>
  </article>
</div>`
            case "interests":
                return `<div class='space-y-2'>
  <div class='flex items-center gap-2 text-lg font-bold text-green-400'>
    <span role='img' aria-label='Interests'>🌱</span> Interests
  </div>
  <ul class='list-disc ml-6 text-slate-300'>
    <li><span class='text-blue-400 font-semibold'>Web Development</span> (React, Vue, Node.js)</li>
    <li><span class='text-pink-400 font-semibold'>User Experience Design</span></li>
    <li><span class='text-purple-400 font-semibold'>Psychology & Human Behavior</span></li>
    <li><span class='text-yellow-400 font-semibold'>Music Production & Singing</span> <span role='img' aria-label='music'>🎵</span></li>
    <li><span class='text-cyan-400 font-semibold'>Gaming & Interactive Media</span></li>
    <li><span class='text-orange-400 font-semibold'>Agile Development Methodologies</span></li>
  </ul>
</div>`
            case "high-school":
                return `<div class='space-y-2'>
  <div class='flex items-center gap-2 text-lg font-bold text-blue-400'>
    <span role='img' aria-label='High School'>🏫</span> High School Education
  </div>
  <div class='text-slate-300'>
    Completed secondary education with focus on <span class='text-yellow-300'>mathematics</span> and <span class='text-green-300'>sciences</span>.<br/>
    Built a strong foundation for <span class='text-purple-400'>analytical thinking</span> and <span class='text-pink-400'>problem-solving</span> skills.
  </div>
</div>`
            case "university":
                return `<div class='space-y-2'>
  <div class='flex items-center gap-2 text-lg font-bold text-purple-400'>
    <span role='img' aria-label='University'>🎓</span> University Education
  </div>
  <div class='text-slate-300'>
    <span class='font-semibold text-yellow-300'>Master's degree</span> in <span class='text-blue-300'>Business Psychology</span><br/>
    <span class='bg-slate-800/60 px-2 py-1 rounded text-xs text-slate-200'>SWPS University of Humanities and Social Sciences</span><br/>
    <span class='text-slate-400'>Department of Psychology in Wrocław</span><br/>
    <span class='text-green-400'>2018 – 2023</span>
  </div>
  <div class='text-slate-400'>
    Specialized in <span class='text-pink-400'>social</span> and <span class='text-blue-400'>cognitive psychology</span> with focus on <span class='text-green-400'>human behavior in business contexts</span>.
  </div>
</div>`
            default:
                return ""
        }
    }

    return (
        <section className="flex flex-col lg:flex-row">
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
                                    onClick={() => openFile("experience")}
                                    className="flex items-center space-x-2 text-slate-400 hover:text-white font-mono text-sm p-1 hover:bg-slate-800/50 rounded w-full text-left transition-all duration-200 hover:scale-105"
                                >
                                    <File className="w-4 h-4 text-cyan-400"/>
                                    <span>experience</span>
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
                <div className="flex min-w-0 max-w-full border-b border-slate-700/50 bg-slate-900/30 overflow-x-auto">
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
                <div className="min-w-0 flex-1 flex flex-col lg:flex-row overflow-x-hidden">
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
                                        {['personal-info', 'bio', 'experience', 'interests', 'high-school', 'university'].includes(activeFile) ? (
                                            <div
                                                className="min-w-0 max-w-full overflow-hidden bg-slate-900/40 rounded-md p-3 sm:p-4 break-words"
                                                dangerouslySetInnerHTML={{
                                                    __html: getFileContent(activeFile),
                                                }}
                                            />
                                        ) : (
                                            <pre
                                                className="text-slate-300 font-mono text-xs lg:text-sm leading-6 whitespace-pre-wrap break-words"
                                                style={{
                                                    lineHeight: "1.5",
                                                    backgroundColor: "#1e293b",
                                                    borderRadius: "0.375rem",
                                                    padding: "1rem",
                                                }}
                                            >
                                                <code
                                                    className="language-typescript"
                                                    dangerouslySetInnerHTML={{
                                                        __html: highlightCode(getFileContent(activeFile), "typescript"),
                                                    }}
                                                />
                                            </pre>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel */}
                    <div
                        className="min-w-0 w-full lg:w-[30vw] bg-slate-900/30 border-t lg:border-l lg:border-t-0 border-slate-700/50 p-2 sm:p-4">
                        <h3 className="text-slate-400 font-mono text-xs sm:text-sm mb-4">// Code snippet showcase:</h3>
                        <div className="space-y-4">
                            {codeSnippets[activeFile] ? (
                                <div
                                    className="bg-slate-800/50 rounded p-2 sm:p-3 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105">
                                    <div className={`${codeSnippets[activeFile].color} font-mono text-xs mb-2`}>
                                        {codeSnippets[activeFile].title}
                                    </div>
                                    <pre
                                        className="text-slate-300 font-mono text-xs whitespace-pre-wrap break-words"
                                    >
                                        <code
                                            className="language-typescript"
                                            dangerouslySetInnerHTML={{
                                                __html: highlightCode(codeSnippets[activeFile].code, "typescript"),
                                            }}
                                        />
                                    </pre>
                                </div>
                            ) : (
                                // fallback: show nothing or a default snippet
                                <div className="text-slate-500 font-mono text-xs">No code snippet for this section.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
