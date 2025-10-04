"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Bot, Eye, Mic, Hash, Cpu, CheckCircle, XCircle, Clock, Zap } from "lucide-react"
import Link from "next/link"

interface AIStep {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  details: string[]
  metrics: {
    accuracy: string
    speed: string
    throughput: string
  }
}

export default function AIAutomationPage() {
  const aiPipeline: AIStep[] = [
    {
      id: "yolo",
      name: "YOLO",
      description: "Computer Vision Object Detection",
      icon: <Eye className="w-6 h-6" />,
      color: "bg-blue-500",
      details: [
        "Detects potholes, broken infrastructure, and garbage",
        "Real-time object recognition with 94% accuracy",
        "Identifies multiple issues in single image",
        "Provides confidence scores for each detection",
      ],
      metrics: {
        accuracy: "94%",
        speed: "0.3s",
        throughput: "1000/hr",
      },
    },
    {
      id: "whisper",
      name: "Whisper AI",
      description: "Speech-to-Text Processing",
      icon: <Mic className="w-6 h-6" />,
      color: "bg-green-500",
      details: [
        "Converts voice messages to text",
        "Supports multiple Indian languages",
        "Filters out background noise",
        "Extracts key issue information",
      ],
      metrics: {
        accuracy: "96%",
        speed: "0.8s",
        throughput: "500/hr",
      },
    },
    {
      id: "phash",
      name: "pHash",
      description: "Duplicate Detection System",
      icon: <Hash className="w-6 h-6" />,
      color: "bg-purple-500",
      details: [
        "Identifies duplicate image submissions",
        "Prevents spam and false reports",
        "Perceptual hashing algorithm",
        "Cross-references with existing database",
      ],
      metrics: {
        accuracy: "99%",
        speed: "0.1s",
        throughput: "2000/hr",
      },
    },
    {
      id: "onnx",
      name: "ONNX Runtime",
      description: "Issue Classification & Validation",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-orange-500",
      details: [
        "Classifies issue type and priority",
        "Validates authenticity of reports",
        "Routes to appropriate department",
        "Generates automated responses",
      ],
      metrics: {
        accuracy: "92%",
        speed: "0.5s",
        throughput: "800/hr",
      },
    },
  ]

  const processingStats = [
    { label: "Total Issues Processed", value: "12,456", change: "+23%" },
    { label: "Valid Issues Identified", value: "11,234", change: "+18%" },
    { label: "Fake Reports Filtered", value: "1,222", change: "+45%" },
    { label: "Average Processing Time", value: "1.7s", change: "-12%" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Automation Pipeline</h1>
                <p className="text-sm text-muted-foreground">How AI processes and validates civic issues</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Bot className="w-4 h-4 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-4 py-8"
        >
          <h2 className="text-3xl font-bold text-balance">
            Advanced AI Pipeline for <span className="text-primary">Intelligent</span> Issue Processing
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-3xl mx-auto">
            Our sophisticated AI system combines multiple technologies to ensure accurate, fast, and reliable processing
            of civic issues reported by citizens.
          </p>
        </motion.section>

        {/* Processing Stats */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {processingStats.map((stat, index) => (
              <Card key={stat.label} className="border-border bg-card shadow-lg">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* AI Pipeline Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">AI Processing Pipeline</h3>
            <p className="text-muted-foreground">Each civic issue goes through these AI-powered stages</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {aiPipeline.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="border-border bg-card shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center text-white`}>
                        {step.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{step.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Capabilities */}
                    <div>
                      <h4 className="font-semibold mb-2">Capabilities:</h4>
                      <ul className="space-y-1">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{step.metrics.accuracy}</p>
                        <p className="text-xs text-muted-foreground">Accuracy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{step.metrics.speed}</p>
                        <p className="text-xs text-muted-foreground">Avg Speed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{step.metrics.throughput}</p>
                        <p className="text-xs text-muted-foreground">Per Hour</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Flow Visualization */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="border-border bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">Processing Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
                {aiPipeline.map((step, index) => (
                  <div key={step.id} className="flex flex-col lg:flex-row items-center gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                      >
                        {step.icon}
                      </div>
                      <p className="font-semibold mt-2">{step.name}</p>
                      <p className="text-xs text-muted-foreground">{step.metrics.speed}</p>
                    </div>
                    {index < aiPipeline.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-muted-foreground hidden lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Results Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="border-border bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Processing Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600">Valid Issues</h4>
                    <p className="text-sm text-muted-foreground">
                      Verified issues are automatically routed to the appropriate municipal department
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600">Fake Reports</h4>
                    <p className="text-sm text-muted-foreground">
                      Invalid or spam reports are filtered out and moved to trash with detailed reasoning
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-600">Pending Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Ambiguous cases are flagged for manual review by municipal staff
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center py-8"
        >
          <Card className="border-primary/20 bg-primary/5 shadow-lg max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <Zap className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">Why AI-Powered Processing?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold mb-2">Speed & Efficiency</h4>
                    <p className="text-sm text-muted-foreground">Process thousands of reports in minutes, not hours</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Accuracy & Reliability</h4>
                    <p className="text-sm text-muted-foreground">Consistent validation with 90%+ accuracy rates</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">24/7 Availability</h4>
                    <p className="text-sm text-muted-foreground">Continuous processing without human intervention</p>
                  </div>
                </div>
                <Link href="/">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  )
}
