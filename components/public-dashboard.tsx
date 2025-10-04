"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  Upload,
  Mic,
  MapPin,
  FileText,
  Camera,
  Trophy,
  Settings,
  Home,
  BarChart3,
  Gift,
  History,
  MessageSquare,
  X,
} from "lucide-react"
import Image from "next/image"

interface UserStatus {
  submitted: number
  accepted: number
  resolved: number
}

interface LeaderboardEntry {
  user: string
  points: number
  rank: number
}

export function PublicDashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [uploadType, setUploadType] = useState<"image" | "voice" | "text" | "geotag">("image")
  const [issueText, setIssueText] = useState("")
  const [location, setLocation] = useState("Sandbox Location")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock data
  const userStatus: UserStatus = {
    submitted: 70,
    accepted: 52,
    resolved: 42,
  }

  const leaderboard: LeaderboardEntry[] = [
    { user: "Karan", points: 1200, rank: 1 },
    { user: "Jashwanth", points: 95, rank: 2 },
    { user: "jeevith", points: 80, rank: 3 },
    { user: "Akshiya", points: 65, rank: 4 },
  ]

  const userHistory = [
    { id: "1", issue: "Pothole on MG Road", status: "resolved", date: "2024-01-10", points: 25 },
    { id: "2", issue: "Street light not working", status: "accepted", date: "2024-01-12", points: 15 },
    { id: "3", issue: "Garbage collection delay", status: "submitted", date: "2024-01-14", points: 0 },
  ]

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUpload = async () => {
    if (uploadType === "image" && !selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      })
      return
    }

    if (uploadType === "text" && !issueText.trim()) {
      toast({
        title: "No Description",
        description: "Please describe the issue.",
        variant: "destructive",
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append("userId", "user123")
      formData.append("type", uploadType)
      formData.append("location", location)

      if (uploadType === "image" && selectedImage) {
        formData.append("image", selectedImage)
      } else if (uploadType === "text") {
        formData.append("description", issueText)
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Issue Submitted Successfully",
          description: "Your civic issue has been submitted for AI processing.",
        })

        // Reset form
        setIssueText("")
        setLocation("Sandbox Location")
        removeImage()
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to submit your issue. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Speak clearly to record your issue.",
      })
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false)
        toast({
          title: "Recording Completed",
          description: "Your voice message has been recorded.",
        })
      }, 3000)
    }
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `Sandbox Location: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          )
          toast({
            title: "Location Detected",
            description: "Your current location has been added to the report.",
          })
        },
        () => {
          toast({
            title: "Location Access Denied",
            description: "Using sandbox location instead.",
          })
          setLocation("Sandbox Location: Default Area")
        },
      )
    } else {
      setLocation("Sandbox Location: GPS Not Available")
    }
  }

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) return

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, source: "public_dashboard" }),
      })

      if (response.ok) {
        setFeedback("")
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your feedback!",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-[#138808]/10 text-[#138808] border-[#138808]/20"
      case "accepted":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/20"
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
      {/* Mobile Screen Header */}
      <div className="bg-[#0B3D91] text-white p-4 border-b-4 border-[#FF9933]">


        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">RaaBITA</h3>
            <p className="text-xs opacity-90">Civic Reporter</p>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 min-h-[500px]">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="space-y-4 mt-0">
            {/* Upload Section */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Report Issue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Type Selection */}
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant={uploadType === "image" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadType("image")}
                    className="flex flex-col gap-1 h-auto py-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="text-xs">Photo</span>
                  </Button>
                  <Button
                    variant={uploadType === "voice" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadType("voice")}
                    className="flex flex-col gap-1 h-auto py-2"
                  >
                    <Mic className="w-4 h-4" />
                    <span className="text-xs">Voice</span>
                  </Button>
                  <Button
                    variant={uploadType === "text" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadType("text")}
                    className="flex flex-col gap-1 h-auto py-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">Text</span>
                  </Button>
                  <Button
                    variant={uploadType === "geotag" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadType("geotag")}
                    className="flex flex-col gap-1 h-auto py-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Location</span>
                  </Button>
                </div>

                {/* Upload Interface */}
                {uploadType === "image" && (
                  <div className="space-y-3">
                    {imagePreview ? (
                      <div className="relative">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Selected issue"
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg border border-border"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={removeImage}
                          className="absolute top-2 right-2 w-8 h-8 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={handleImageUpload}
                      >
                        <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Tap to capture or upload photo</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                )}

                {uploadType === "voice" && (
                  <div className="text-center space-y-3">
                    <Button
                      onClick={handleVoiceRecord}
                      className={`w-16 h-16 rounded-full ${
                        isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      <Mic className="w-6 h-6" />
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {isRecording ? "Recording..." : "Tap to record voice message"}
                    </p>
                  </div>
                )}

                {uploadType === "text" && (
                  <Textarea
                    placeholder="Describe the civic issue..."
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    className="min-h-[100px]"
                  />
                )}

                {uploadType === "geotag" && (
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter location or use GPS"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleUseCurrentLocation}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Use Current Location
                    </Button>
                  </div>
                )}

                <Button onClick={handleUpload} className="w-full bg-primary hover:bg-primary/90">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Issue
                </Button>
              </CardContent>
            </Card>

            {/* Status Overview */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{userStatus.submitted}</div>
                    <div className="text-xs text-muted-foreground">Submitted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#FF9933]">{userStatus.accepted}</div>
                    <div className="text-xs text-muted-foreground">Accepted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#138808]">{userStatus.resolved}</div>
                    <div className="text-xs text-muted-foreground">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-4 mt-0">
            {/* Leaderboard */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#FF9933]" />
                  Citizen Scoreboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.user} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            entry.rank === 1
                              ? "bg-[#FF9933] text-white"
                              : entry.rank === 2
                                ? "bg-gray-400 text-white"
                                : entry.rank === 3
                                  ? "bg-amber-600 text-white"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {entry.rank}
                        </div>
                        <span className={`font-medium ${entry.user === "You" ? "text-primary" : ""}`}>
                          {entry.user}
                        </span>
                      </div>
                      <Badge variant="secondary">{entry.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-0">
            {/* History */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Issue History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userHistory.map((item) => (
                    <div key={item.id} className="border-b border-border pb-3 last:border-b-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium">{item.issue}</p>
                        <Badge className={getStatusColor(item.status)} variant="outline">
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{item.date}</span>
                        <span>{item.points} points</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Rewards & Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-primary">65</div>
                  <p className="text-sm text-muted-foreground">Total Points Earned</p>
                  <div className="flex justify-center gap-2">
                    <Badge variant="secondary">First Reporter</Badge>
                    <Badge variant="secondary">Community Helper</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share your feedback..."
                  className="mb-3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  size="sm"
                  onClick={handleFeedbackSubmit}
                  disabled={!feedback.trim()}
                >
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border bg-card">
        <div className="grid grid-cols-3 gap-1">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            onClick={() => setActiveTab("home")}
            className="rounded-none flex flex-col gap-1 h-auto py-3"
          >
            <Home className="w-4 h-4" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            onClick={() => setActiveTab("dashboard")}
            className="rounded-none flex flex-col gap-1 h-auto py-3"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            onClick={() => setActiveTab("settings")}
            className="rounded-none flex flex-col gap-1 h-auto py-3"
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
