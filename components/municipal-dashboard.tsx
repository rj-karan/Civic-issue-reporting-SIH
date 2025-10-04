"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  ImageIcon,
  Mic,
  FileText,
  AlertTriangle,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import { IndiaMapCluster } from "./india-map-cluster"

interface Issue {
  id: string
  type: "image" | "voice" | "text" | "geotag"
  status: "pending" | "valid" | "fake"
  content: string
  location?: string
  timestamp: string
  imageUrl?: string
  aiProcessing: {
    yolo?: string
    whisper?: string
    phash?: string
    onnx?: string
  }
}

export function MunicipalDashboard() {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "1",
      type: "image",
      status: "valid",
      content: "Pothole on MG Road causing traffic issues",
      location: "Sandbox Location: MG Road, Sector 14",
      timestamp: "2025-01-15 11:30 AM",
      imageUrl: "/2520391-potholes-kalyan.webp",
      aiProcessing: {
        yolo: "Pothole detected with 94% confidence",
        phash: "No duplicate found",
        onnx: "Infrastructure issue - High priority",
      },
    },
    {
      id: "2",
      type: "voice",
      status: "pending",
      content: "Street light not working near bus stop",
      location: "Sandbox Location: Bus Stop, Phase 2",
      timestamp: "2025-01-15 11:15 AM",
      aiProcessing: {
        whisper: "Transcription: Street light malfunction reported",
        onnx: "Processing...",
      },
    },
    {
      id: "3",
      type: "image",
      status: "valid",
      content: "Garbage pile near residential area",
      location: "Sandbox Location: Green Park Extension",
      timestamp: "2025-01-15 09:45 AM",
      imageUrl: "/fliesthrongo.jpg",
      aiProcessing: {
        yolo: "Waste accumulation detected with 89% confidence",
        phash: "Similar image found - verified authentic",
        onnx: "Sanitation issue - Medium priority",
      },
    },
    {
      id: "4",
      type: "image",
      status: "fake",
      content: "Fake complaint about non-existent water logging",
      location: "Sandbox Location: Central Park",
      timestamp: "2025-01-15 08:30 AM",
      imageUrl: "/Gemini_Generated_Image_3pr6v83pr6v83pr6.png",
      aiProcessing: {
        yolo: "No water logging detected",
        phash: "Image manipulation detected",
        onnx: "Flagged as potentially false report",
      },
    },
  ])

  const [feedback, setFeedback] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="w-4 h-4 text-[#138808]" />
      case "fake":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-[#FF9933]" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "voice":
        return <Mic className="w-4 h-4" />
      case "geotag":
        return <MapPin className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const handleProcessIssue = async (issueId: string, action: "approve" | "reject") => {
    try {
      const response = await fetch(`/api/${action === "approve" ? "department" : "trash"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId }),
      })

      if (response.ok) {
        // Update the issue status locally
        setIssues((prev) =>
          prev.map((issue) =>
            issue.id === issueId ? { ...issue, status: action === "approve" ? "valid" : "fake" } : issue,
          ),
        )

        toast({
          title: action === "approve" ? "Issue Approved" : "Issue Rejected",
          description:
            action === "approve"
              ? "Issue has been sent to the relevant department"
              : "Issue has been marked as fake and moved to trash",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the issue. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFeedbackSubmit = async () => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      })

      if (response.ok) {
        setFeedback("")
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your feedback on the AI processing system.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#138808]/10 border-[#138808]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valid Issues</p>
                <p className="text-2xl font-bold text-[#138808]">24</p>
              </div>
              <CheckCircle className="w-8 h-8 text-[#138808]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#FF9933]/10 border-[#FF9933]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-[#FF9933]">8</p>
              </div>
              <Clock className="w-8 h-8 text-[#FF9933]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fake Reports</p>
                <p className="text-2xl font-bold text-red-500">3</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <p className="text-2xl font-bold text-primary">35</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <IndiaMapCluster className="w-full" />

      {/* Issues List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Issues</h3>
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(issue.type)}
                    <Badge variant="outline" className="capitalize">
                      {issue.type}
                    </Badge>
                    {getStatusIcon(issue.status)}
                    <Badge
                      variant={
                        issue.status === "valid" ? "default" : issue.status === "fake" ? "destructive" : "secondary"
                      }
                      className="capitalize"
                    >
                      {issue.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{issue.timestamp}</span>
                </div>

                {issue.imageUrl && (
                  <div className="mb-3">
                    <Image
                      src={issue.imageUrl || "/placeholder.svg"}
                      alt={issue.content}
                      width={300}
                      height={200}
                      className="rounded-lg border border-border object-cover"
                    />
                  </div>
                )}

                <p className="text-sm mb-2">{issue.content}</p>

                {issue.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3" />
                    {issue.location}
                  </div>
                )}

                {/* AI Processing Results */}
                <div className="bg-muted/50 rounded-lg p-3 mb-3">
                  <h4 className="text-sm font-medium mb-2">AI Processing Results:</h4>
                  <div className="space-y-1 text-xs">
                    {issue.aiProcessing.yolo && (
                      <div>
                        <strong>YOLO:</strong> {issue.aiProcessing.yolo}
                      </div>
                    )}
                    {issue.aiProcessing.whisper && (
                      <div>
                        <strong>Whisper AI:</strong> {issue.aiProcessing.whisper}
                      </div>
                    )}
                    {issue.aiProcessing.phash && (
                      <div>
                        <strong>pHash:</strong> {issue.aiProcessing.phash}
                      </div>
                    )}
                    {issue.aiProcessing.onnx && (
                      <div>
                        <strong>ONNX Runtime:</strong> {issue.aiProcessing.onnx}
                      </div>
                    )}
                  </div>
                </div>

                {issue.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleProcessIssue(issue.id, "approve")}
                      className="bg-[#138808] hover:bg-[#138808]/90 text-white"
                    >
                      Approve & Send to Department
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleProcessIssue(issue.id, "reject")}>
                      Mark as Fake
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Feedback Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Feedback Box
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Provide feedback on the AI processing system..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleFeedbackSubmit} disabled={!feedback.trim()} className="bg-primary hover:bg-primary/90">
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
