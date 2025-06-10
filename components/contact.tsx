"use client"

import type React from "react"

import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Loader2, CheckCircle, AlertCircle} from "lucide-react"

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSubmitStatus("success")
                setFormData({name: "", email: "", message: ""})
            } else {
                setSubmitStatus("error")
            }
        } catch (error) {
            console.error("Error sending message:", error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <section className="h-auto min-h-[90vh] flex flex-col items-center justify-center px-2 sm:px-4 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    <div className="space-y-8">
                        <h2
                            className={`text-white font-mono text-2xl sm:text-3xl lg:text-4xl transition-all duration-700 ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                            }`}
                            style={{transitionDelay: "200ms"}}
                        >
                            _contact-me
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                            <div
                                className={`space-y-6 transition-all duration-700 ${
                                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                                }`}
                                style={{transitionDelay: "400ms"}}
                            >
                                <div className="space-y-2 font-mono text-xs sm:text-sm">
                                    <p className="text-slate-500">/**</p>
                                    <p className="text-slate-500"> * Let's work together</p>
                                    <p className="text-slate-500"> * I'm always interested in new opportunities</p>
                                    <p className="text-slate-500"> */</p>
                                </div>

                                <div className="space-y-4 font-mono text-xs sm:text-sm">
                                    <div className="flex items-center space-x-2 flex-wrap">
                                        <span className="text-blue-400">const</span>
                                        <span className="text-white">email</span>
                                        <span className="text-white">=</span>
                                        <a
                                            href="mailto:nikoladziwusz@gmail.com"
                                            className="text-orange-400 hover:text-orange-300 transition-all duration-300 break-all hover:scale-105"
                                        >
                                            "nikoladziwusz@gmail.com"
                                        </a>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-wrap">
                                        <span className="text-blue-400">const</span>
                                        <span className="text-white">phone</span>
                                        <span className="text-white">=</span>
                                        <a
                                            href="tel:+48780086502"
                                            className="text-orange-400 hover:text-orange-300 transition-all duration-300 hover:scale-105"
                                        >
                                            "+48 780 086 502"
                                        </a>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-wrap">
                                        <span className="text-blue-400">const</span>
                                        <span className="text-white">location</span>
                                        <span className="text-white">=</span>
                                        <span className="text-orange-400">"Wrocław, Poland"</span>
                                    </div>
                                </div>

                                <div className="space-y-4 font-mono text-xs sm:text-sm">
                                    <p className="text-slate-500">// Or send me a message directly:</p>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-blue-400">function</span>
                                        <span className="text-yellow-400">sendMessage</span>
                                        <span className="text-white">() {'{'}</span>
                                    </div>
                                    <div className="ml-4">
                                        <span className="text-slate-500">// Fill the form and click submit</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-white">{'}'}</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-700 ${
                                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                                }`}
                                style={{transitionDelay: "600ms"}}
                            >
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Input
                                            name="name"
                                            placeholder="_name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 font-mono focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 text-xs sm:text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="_email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 font-mono focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 text-xs sm:text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <Textarea
                                            name="message"
                                            placeholder="_message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 font-mono resize-none focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 text-xs sm:text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* Status Messages */}
                                    {submitStatus === "success" && (
                                        <div
                                            className="flex items-center space-x-2 text-green-400 font-mono text-xs sm:text-sm p-3 bg-green-400/10 border border-green-400/20 rounded animate-in fade-in duration-300">
                                            <CheckCircle className="w-4 h-4 flex-shrink-0"/>
                                            <span>Message sent successfully!</span>
                                        </div>
                                    )}

                                    {submitStatus === "error" && (
                                        <div
                                            className="flex items-center space-x-2 text-red-400 font-mono text-xs sm:text-sm p-3 bg-red-400/10 border border-red-400/20 rounded animate-in fade-in duration-300">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0"/>
                                            <span>Failed to send message. Please try again.</span>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                                sending-message...
                                            </>
                                        ) : (
                                            "submit-message"
                                        )}
                                    </Button>
                                </form>

                                <div className="mt-4 text-slate-500 font-mono text-xs sm:text-sm">
                                    <p>// Your message will be sent to:</p>
                                    <p className="text-orange-400 break-all">nikoladziwusz@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* Footer */}
            <div
                className="w-full px-2 sm:px-4 absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row justify-between transition-opacity duration-1000"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: "1000ms",
                }}
            >
                <div className="flex items-center space-x-4 pb-3">
                    <span className="text-slate-400 font-mono text-xs md:text-sm">find me in:</span>
                    <div className="flex space-x-3">
                        <a
                            href="https://www.linkedin.com/in/nikola-dziwusz-4837a11a9/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="LinkedIn Profile"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-2 pb-3">
                    <span className="text-slate-400 font-mono text-xs md:text-sm">@nikoladziwusz</span>
                    <a
                        href="https://github.com/NikolaDziwusz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label="GitHub Profile"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>

    )
}
