"use client"

import type React from "react"

import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Loader2, CheckCircle, AlertCircle} from "lucide-react"
import { Footer } from "@/components/footer"

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
        <section className="h-100vh min-h-[90vh] flex flex-col items-center justify-center px-2 sm:px-4 overflow-hidden">
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
            <Footer isVisible={isVisible} />
        </section>
    )
}
