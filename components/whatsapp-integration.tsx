"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Bot, ArrowRight, CheckCircle, Clock, ImageIcon, Mic } from "lucide-react"

interface WhatsAppMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: string
  status?: "sent" | "delivered" | "processed"
  hasMedia?: boolean
  mediaType?: "image" | "voice"
}

export function WhatsAppIntegration() {
  const [messages] = useState<WhatsAppMessage[]>([
    {
      id: "1",
      type: "user",
      content: "Hi, I want to report a pothole near MG Road",
      timestamp: "10:30 AM",
      status: "delivered",
    },
    {
      id: "2",
      type: "bot",
      content: "Thank you for reporting! Can you please share a photo of the pothole?",
      timestamp: "10:31 AM",
    },
    {
      id: "3",
      type: "user",
      content: "Here is the photo",
      timestamp: "10:32 AM",
      status: "processed",
      hasMedia: true,
      mediaType: "image",
    },
    {
      id: "4",
      type: "bot",
      content: "Perfect! Your issue has been registered with ID #RB2024001. Our AI system is processing your report.",
      timestamp: "10:33 AM",
    },
    {
      id: "5",
      type: "bot",
      content:
        "Update: Your report has been validated and forwarded to the Municipal Corporation. You will receive updates on this number.",
      timestamp: "10:35 AM",
    },
  ])

  const [processingSteps] = useState([
    { step: "Message Received", status: "completed", time: "10:32 AM" },
    { step: "AI Processing", status: "completed", time: "10:33 AM" },
    { step: "Validation", status: "completed", time: "10:34 AM" },
    { step: "Department Routing", status: "completed", time: "10:35 AM" },
    { step: "Resolution Tracking", status: "in-progress", time: "Ongoing" },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-muted" />
    }
  }

  const getMediaIcon = (mediaType?: string) => {
    switch (mediaType) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "voice":
        return <Mic className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* WhatsApp Chat Interface */}
      <div className="max-w-sm mx-auto">
        <Card className="border-border bg-card shadow-lg overflow-hidden">
          {/* WhatsApp Header */}
          <div className="bg-green-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">RaaBITA Bot</h3>
                <p className="text-xs opacity-90">Civic Issue Assistant</p>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-green-50 dark:bg-green-950/20 p-4 space-y-3 min-h-[400px] max-h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-green-500 text-white"
                      : "bg-white dark:bg-card text-foreground shadow-sm"
                  }`}
                >
                  {message.hasMedia && (
                    <div className="flex items-center gap-2 mb-2 text-sm opacity-80">
                      {getMediaIcon(message.mediaType)}
                      <span>Media attached</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                    {message.type === "user" && message.status && (
                      <div className="flex items-center gap-1">
                        {message.status === "processed" && (
                          <Badge variant="secondary" className="text-xs bg-white/20">
                            Processed
                          </Badge>
                        )}
                        <CheckCircle className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-3 bg-white dark:bg-card">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full px-4 py-2">
                <span className="text-sm text-muted-foreground">Type a message...</span>
              </div>
              <Button size="sm" className="rounded-full w-10 h-10 p-0 bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Processing Flow Visualization */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            WhatsApp → AI → Dashboard Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processingSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(step.status)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{step.step}</p>
                    <p className="text-xs text-muted-foreground">{step.time}</p>
                  </div>
                </div>
                {index < processingSteps.length - 1 && <div className="w-px h-8 bg-border ml-2"></div>}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border bg-green-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp Reports</p>
                <p className="text-2xl font-bold text-green-600">156</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Processed</p>
                <p className="text-2xl font-bold text-blue-600">142</p>
              </div>
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-primary">91%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How to Use */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">How to Report via WhatsApp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Send a message</p>
                <p className="text-sm text-muted-foreground">Text +91-XXXXX-XXXXX with your civic issue</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Share media (optional)</p>
                <p className="text-sm text-muted-foreground">Attach photos or voice messages for better context</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Get instant confirmation</p>
                <p className="text-sm text-muted-foreground">Receive issue ID and tracking updates</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
