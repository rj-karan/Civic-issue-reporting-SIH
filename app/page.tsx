"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MunicipalDashboard } from "@/components/municipal-dashboard"
import { WhatsAppIntegration } from "@/components/whatsapp-integration"
import { MobileCivicTracker } from "@/components/mobile-civic-tracker"
import { Bot, Shield, Users, Zap, Star, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { ReportingFlow } from "@/components/reporting-flow"

export default function HomePage() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
        }
      })
    }, observerOptions)

    document.querySelectorAll(".fade-in, .slide-up, .blur-in, .scale-in").forEach((el) => {
      el.style.animationPlayState = "paused"
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 mx-auto max-w-7xl px-6 lg:px-8 fade-in"
      >
        <div className="flex pt-6 pb-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/Untitlqwyuilkjed-1.png"
              alt="Viksit Bharat RaaBITA Logo"
              width={60}
              height={60}
              className="object-contain rounded-xl"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Viksit Bharat RaaBITA</h1>
              <p className="text-sm text-gray-600">Civic Issue Reporting System</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-white border-none px-4 py-2 rounded-full shadow-lg">
            Digital India Initiative
          </Badge>
        </div>
      </motion.header>

      <main className="mx-auto max-w-7xl px-6 lg:px-8">
        <section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-6">
                <h1 className="sm:text-6xl lg:text-7xl leading-none slide-up text-5xl font-bold text-gray-900 tracking-tight">
                  Empowering Citizens.
                  <br />
                  <span className="slide-up delay-200 text-neutral-950/70">Building Better India.</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed max-w-xl slide-up delay-300">
                  AI-powered civic engagement platform that processes, validates, and routes your concerns to
                  authorities for swift resolution.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start slide-up delay-400">
                <Button
                  size="lg"
                  onClick={scrollToNextSection}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Bot className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Scroll Down
                </Button>
                <Link href="/ai-automation">
                  <Button
                    variant="outline"
                    size="lg"
                    className="inline-flex items-center gap-3 font-medium rounded-full px-8 py-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 bg-transparent"
                  >
                    <Sparkles className="h-5 w-5" />
                    See How AI Works
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-gray-500 slide-up delay-500">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2M+ citizens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>4.9 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Government verified</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 blur-in delay-600">
              <div className="relative">
                <MobileCivicTracker />

                <div className="absolute -top-6 -right-6 flex delay-800 bg-[#e4ebfb]/25 w-16 h-16 rounded-2xl shadow-2xl backdrop-blur-3xl scale-in items-center justify-center">
                  <Sparkles className="w-8 h-8 text-neutral-950" />
                </div>
                <div className="absolute -bottom-4 -left-4 flex delay-700 bg-neutral-950/60 w-12 h-12 rounded-xl shadow-lg backdrop-blur-3xl scale-in items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white rounded-3xl shadow-lg border border-gray-200/50 mb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Designed for digital governance
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Every feature crafted with intention. Every interaction designed to empower citizens.
              </p>
            </div>

            <div className="grid gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group card-hover slide-up delay-100 text-center rounded-2xl p-6 space-y-6">
                <div className="flex bg-slate-800 w-16 h-16 rounded-2xl mx-auto shadow-lg items-center justify-center">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">AI-Powered Processing</h3>
                  <p className="leading-relaxed text-gray-600">
                    Advanced AI validates and routes civic issues using YOLO, Whisper AI, and ONNX Runtime.
                  </p>
                </div>
              </div>

              <div className="group card-hover slide-up delay-200 text-center rounded-2xl p-6 space-y-6">
                <div className="flex bg-slate-800 w-16 h-16 rounded-2xl mx-auto shadow-lg items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Community Driven</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Crowdsourced reporting system that empowers every citizen to contribute to governance.
                  </p>
                </div>
              </div>

              <div className="group card-hover slide-up delay-300 text-center rounded-2xl p-6 space-y-6">
                <div className="flex bg-slate-800 w-16 h-16 rounded-2xl mx-auto shadow-lg items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Real-time Tracking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Live updates and progress tracking with detailed analytics and resolution timelines.
                  </p>
                </div>
              </div>

              <div className="group card-hover slide-up delay-400 text-center rounded-2xl p-6 space-y-6">
                <div className="flex bg-slate-800 w-16 h-16 rounded-2xl mx-auto shadow-lg items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Government Verified</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Official Digital India initiative with secure, verified municipal integrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-16 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-border bg-white shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="civic-gradient text-white">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Municipal Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <MunicipalDashboard />
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-border bg-white shadow-2xl rounded-3xl overflow-hidden card-hover">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Reporting Flow & Systems
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ReportingFlow />
              </CardContent>
            </Card>

            <Card className="border-border bg-white shadow-2xl rounded-3xl overflow-hidden card-hover">
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-500/5">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bot className="w-5 h-5 text-green-600" />
                  WhatsApp Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <WhatsAppIntegration />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <section className="py-24 bg-[#2979FF]/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
              The future of governance
              <span className="bg-clip-text font-medium text-transparent bg-gradient-to-r from-white/60 to-white/80">
                {" "}
                starts today
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
              Join millions of citizens building a better India through technology-driven civic engagement and
              transparent governance.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 slide-up delay-200">
              <Link href="/ai-automation">
                <Button
                  size="lg"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Bot className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Explore AI Features
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-center border-t border-gray-800 pt-16 slide-up delay-400">
              <div>
                <p className="text-4xl font-bold text-white mb-2">2M+</p>
                <p className="text-black">Active citizens</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">98%</p>
                <p className="text-black">Resolution rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">28</p>
                <p className="text-black">States covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-6 gap-8 mb-16">
            <div className="md:col-span-2 fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/IMG_4669.PNG"
                  alt="Viksit Bharat RaaBITA Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900">Viksit Bharat RaaBITA</h3>
              </div>
              <p className="text-gray-600 max-w-md leading-relaxed mb-6">
                Revolutionizing civic engagement through intelligent, AI-powered reporting systems designed for Digital
                India.
              </p>
            </div>

            <div className="fade-in delay-100">
              <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    AI Processing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div className="fade-in delay-200">
              <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Issue Reporting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    WhatsApp Bot
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Municipal Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Public Dashboard
                  </a>
                </li>
              </ul>
            </div>

            <div className="fade-in delay-300">
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Citizen Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>

            <div className="fade-in delay-400">
              <h4 className="font-semibold text-gray-900 mb-4">Government</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Digital India
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 fade-in delay-500">
            <div className="text-center mb-4">
              <p className="text-gray-600 text-sm">
                Crafted By - Karan RJ - Ishwarya S - Jashwanth MU - Jeevith V - Akshiya C - Bhavayazhinitha SV
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500">
                © 2025 Viksit Bharat RaaBITA - Digital India Initiative. Crafted for transparent governance.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Terms
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
