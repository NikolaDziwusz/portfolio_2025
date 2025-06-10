"use client"

import {useState, useEffect} from "react"
import {ChevronDown, ChevronRight, Folder, File, Mail, Phone, X} from "lucide-react"

// --- Add simple syntax highlighter ---
function escapeHtml(str: string) {
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function highlightCode(code: string) {
    // Escape HTML first
    code = escapeHtml(code);

    // Store matches to avoid double-highlighting
    const matches: string[] = [];
    let i = 0;

    // Highlight comments and strings first, replace with placeholders
    code = code.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"[^"]*"|'[^']*'|`[^`]*`)/g, (m) => {
        matches.push(m);
        return `___PLACEHOLDER_${i++}___`;
    });

    // Keywords
    code = code.replace(
        /\b(const|let|var|function|return|if|else|for|while|switch|case|break|default|import|from|export|class|extends|new|public|private|protected|static|interface|type|enum|implements|readonly|async|await)\b/g,
        '<span class="text-blue-400">$1</span>'
    );
    // Types
    code = code.replace(
        /\b(string|number|boolean|void|any|unknown|never|object|Array|Record|Partial|Pick|Omit|typeof|instanceof)\b/g,
        '<span class="text-purple-400">$1</span>'
    );
    // Numbers
    code = code.replace(
        /\b(\d+)\b/g,
        '<span class="text-yellow-400">$1</span>'
    );
    // Variable names after const/let/var
    code = code.replace(
        /\b(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
        '<span class="text-blue-400">$1</span> <span class="text-white">$2</span>'
    );
    // Equal signs
    code = code.replace(
        /(=)/g,
        '<span class="text-slate-300">$1</span>'
    );
    // Array brackets
    code = code.replace(
        /(\[|\])/g,
        '<span class="text-yellow-400">$1</span>'
    );
    // Object brackets
    code = code.replace(
        /(\{|\})/g,
        '<span class="text-yellow-400">$1</span>'
    );

    // Restore comments and strings
    code = code.replace(/___PLACEHOLDER_(\d+)___/g, (_, n) => {
        const m = matches[Number(n)];
        if (/^\/\//.test(m) || /^\/\*/.test(m)) {
            return `<span class=\"text-slate-500\">${m}</span>`;
        }
        return `<span class=\"text-orange-400\">${m}</span>`;
    });

    return code;
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
                return `<div class='space-y-2'>
  <div class='flex items-center gap-2 text-lg font-bold text-teal-300'>
    <span role='img' aria-label='About'>👤</span> About Me
  </div>
  <div class='text-slate-300'>
    <span class='font-semibold text-yellow-300'>Business Psychology Graduate</span> with a strong background in <span class='text-pink-400'>social</span> and <span class='text-blue-400'>cognitive psychology</span>, passionate about <span class='italic text-green-400'>understanding human behavior</span>.<br/>
    <span class='font-semibold text-orange-300'>Web Developer</span> for 2+ years, combining <span class='text-purple-400'>analytical</span> and <span class='text-pink-400'>creative</span> skills.<br/>
    <span class='bg-slate-800/60 px-2 py-1 rounded text-xs text-slate-200'>Music lover</span> <span class='bg-slate-800/60 px-2 py-1 rounded text-xs text-slate-200'>Problem solver</span>
  </div>
  <ul class='list-disc ml-6 text-slate-400'>
    <li>Driven by curiosity and empathy</li>
    <li>Enjoys singing & music production <span role='img' aria-label='music'>🎤🎶</span></li>
    <li>Believes in <span class='text-green-300 font-semibold'>user-centric</span> solutions</li>
  </ul>
</div>`
            case "bio":
                return `<div class='space-y-2'>
  <div class='flex items-center gap-2 text-lg font-bold text-orange-400'>
    <span role='img' aria-label='Bio'>📝</span> Bio
  </div>
  <div class='text-slate-300'>
    <span class='font-semibold text-blue-300'>Full-Stack Developer</span> at <span class='bg-blue-900/60 px-2 py-1 rounded text-blue-200'>Samsung</span><br/>
    <span class='font-semibold text-yellow-300'>Business Psychology Graduate</span>
  </div>
  <div class='text-slate-400'>
    <span class='italic'>Currently developing</span> <span class='text-pink-400'>CMS applications</span> for <span class='text-blue-400'>Samsung Global Goals</span> charity initiative.<br/>
    <span class='text-green-400'>Passionate</span> about combining <span class='text-purple-400'>psychology insights</span> with <span class='text-orange-400'>modern web technologies</span>.
  </div>
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
                                        {['personal-info', 'bio', 'interests', 'high-school', 'university'].includes(activeFile) ? (
                                            <div
                                                className="bg-slate-900/40 rounded-md p-4"
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
                                                dangerouslySetInnerHTML={{
                                                    __html: highlightCode(getFileContent(activeFile)),
                                                }}
                                            />
                                        )}
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
                                <pre className="text-slate-300 font-mono text-xs" dangerouslySetInnerHTML={{
                                  __html: highlightCode(`const skills = [\n  'React', 'Vue', 'Node.js',\n  'TypeScript', 'MongoDB',\n  'Psychology', 'UX Research'\n];`),
                                }} />
                            </div>

                            <div
                                className="bg-slate-800/50 rounded p-2 sm:p-3 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105">
                                <div className="text-blue-400 font-mono text-xs mb-2">Experience Object</div>
                                <pre className="text-slate-300 font-mono text-xs" dangerouslySetInnerHTML={{
                                  __html: highlightCode(`const currentRole = {\n  company: 'Samsung',\n  position: 'Full-stack Developer',\n  duration: '2023 - Present',\n  technologies: ['React', 'Node.js']\n};`),
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
